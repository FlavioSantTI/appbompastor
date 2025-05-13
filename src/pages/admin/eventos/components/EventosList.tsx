
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Evento } from "../types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, CalendarPlus, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventosListProps {
  onEdit: (evento: Evento) => void;
  onInscritos: (evento: Evento) => void;
}

const EventosList = ({ onEdit, onInscritos }: EventosListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const fetchEventos = async (): Promise<Evento[]> => {
    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .order("data_inicio", { ascending: true });

    if (error) {
      toast({
        title: "Erro ao carregar eventos",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }

    return data || [];
  };

  const { data: eventos = [], isLoading } = useQuery({
    queryKey: ["eventos"],
    queryFn: fetchEventos,
  });

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      const { error } = await supabase
        .from("eventos")
        .delete()
        .eq("id", deletingId);

      if (error) throw error;

      toast({
        title: "Evento removido",
        description: "O evento foi removido com sucesso.",
      });

      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    } catch (error: any) {
      toast({
        title: "Erro ao remover evento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
      setShowConfirmDelete(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setShowConfirmDelete(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Carregando eventos...</p>
      </div>
    );
  }

  return (
    <>
      {eventos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum evento encontrado.</p>
          <p className="text-gray-500 mt-2">
            Clique no botão "Novo Evento" para adicionar um evento.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Fim</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Cidade/Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventos.map((evento) => (
                <TableRow key={evento.id}>
                  <TableCell className="font-medium">{evento.titulo}</TableCell>
                  <TableCell>
                    {formatDate(evento.data_inicio)} às {evento.hora_inicio}
                  </TableCell>
                  <TableCell>
                    {formatDate(evento.data_fim)} às {evento.hora_fim}
                  </TableCell>
                  <TableCell>{evento.local}</TableCell>
                  <TableCell>
                    {evento.cidade}/{evento.estado}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(evento)}
                      title="Editar evento"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onInscritos(evento)}
                      title="Gerenciar inscritos"
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => confirmDelete(evento.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Excluir evento"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este evento? Esta ação não poderá
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventosList;
