
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Evento, EventoFormData } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface EventoFormProps {
  evento?: Evento | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const EventoForm = ({ evento, onSuccess, onCancel }: EventoFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventoFormData>({
    titulo: "",
    data_inicio: "",
    data_fim: "",
    hora_inicio: "",
    hora_fim: "",
    local: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    if (evento) {
      setFormData({
        titulo: evento.titulo,
        data_inicio: formatDateForInput(evento.data_inicio),
        data_fim: formatDateForInput(evento.data_fim),
        hora_inicio: evento.hora_inicio,
        hora_fim: evento.hora_fim,
        local: evento.local,
        cidade: evento.cidade,
        estado: evento.estado,
      });
    }
  }, [evento]);

  const formatDateForInput = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.titulo) {
      toast({
        title: "Título é obrigatório",
        description: "Por favor, informe o título do evento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.data_inicio || !formData.data_fim) {
      toast({
        title: "Datas são obrigatórias",
        description: "Por favor, informe as datas de início e fim do evento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.hora_inicio || !formData.hora_fim) {
      toast({
        title: "Horários são obrigatórios",
        description: "Por favor, informe os horários de início e fim do evento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.local) {
      toast({
        title: "Local é obrigatório",
        description: "Por favor, informe o local do evento.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.cidade || !formData.estado) {
      toast({
        title: "Cidade e Estado são obrigatórios",
        description: "Por favor, informe a cidade e estado do evento.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (evento) {
        // Atualizar evento existente
        const { error } = await supabase
          .from("eventos")
          .update({
            titulo: formData.titulo,
            data_inicio: formData.data_inicio,
            data_fim: formData.data_fim,
            hora_inicio: formData.hora_inicio,
            hora_fim: formData.hora_fim,
            local: formData.local,
            cidade: formData.cidade,
            estado: formData.estado,
          })
          .eq("id", evento.id);

        if (error) throw error;

        toast({
          title: "Evento atualizado com sucesso",
          description: "As informações do evento foram atualizadas.",
        });
      } else {
        // Criar novo evento
        const { error } = await supabase.from("eventos").insert({
          titulo: formData.titulo,
          data_inicio: formData.data_inicio,
          data_fim: formData.data_fim,
          hora_inicio: formData.hora_inicio,
          hora_fim: formData.hora_fim,
          local: formData.local,
          cidade: formData.cidade,
          estado: formData.estado,
        });

        if (error) throw error;

        toast({
          title: "Evento criado com sucesso",
          description: "O novo evento foi adicionado.",
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar evento:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao salvar o evento.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
          {evento ? "Editar Evento" : "Novo Evento"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Título do evento"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_inicio">Data de Início *</Label>
                <Input
                  id="data_inicio"
                  name="data_inicio"
                  type="date"
                  value={formData.data_inicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_fim">Data de Término *</Label>
                <Input
                  id="data_fim"
                  name="data_fim"
                  type="date"
                  value={formData.data_fim}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hora_inicio">Hora de Início *</Label>
                <Input
                  id="hora_inicio"
                  name="hora_inicio"
                  type="time"
                  value={formData.hora_inicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora_fim">Hora de Término *</Label>
                <Input
                  id="hora_fim"
                  name="hora_fim"
                  type="time"
                  value={formData.hora_fim}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="local">Local *</Label>
              <Input
                id="local"
                name="local"
                value={formData.local}
                onChange={handleChange}
                placeholder="Local do evento"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Cidade do evento"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  placeholder="Estado do evento"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : evento ? (
                "Atualizar Evento"
              ) : (
                "Criar Evento"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventoForm;
