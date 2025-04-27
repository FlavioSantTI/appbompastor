
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CoupleDialogProps {
  couple: any | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CoupleDialog({ couple, onClose, onUpdate }: CoupleDialogProps) {
  const [formData, setFormData] = useState({
    esposa_nome: '',
    esposo_nome: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (couple) {
      setFormData({
        esposa_nome: couple.esposa?.nome_completo || '',
        esposo_nome: couple.esposo?.nome_completo || '',
      });
    }
  }, [couple]);

  const handleUpdate = async () => {
    try {
      if (!couple) return;

      // Update esposa
      if (couple.esposa) {
        const { error: esposaDuringError } = await supabase
          .from('pessoas')
          .update({ nome_completo: formData.esposa_nome })
          .eq('id_inscricao', couple.id_inscricao)
          .eq('tipo_conjuge', 'esposa');

        if (esposaDuringError) throw esposaDuringError;
      }

      // Update esposo
      if (couple.esposo) {
        const { error: esposoDuringError } = await supabase
          .from('pessoas')
          .update({ nome_completo: formData.esposo_nome })
          .eq('id_inscricao', couple.id_inscricao)
          .eq('tipo_conjuge', 'esposo');

        if (esposoDuringError) throw esposoDuringError;
      }

      toast({
        title: "Atualizado com sucesso",
        description: "Os dados do casal foram atualizados.",
      });
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating couple:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar os dados do casal.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!couple} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Casal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="esposa_nome">Nome da Esposa</Label>
            <Input
              id="esposa_nome"
              value={formData.esposa_nome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, esposa_nome: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="esposo_nome">Nome do Esposo</Label>
            <Input
              id="esposo_nome"
              value={formData.esposo_nome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, esposo_nome: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
