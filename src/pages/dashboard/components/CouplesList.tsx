
import { useState } from 'react';
import { Couple } from './types';
import CouplesTable from './CouplesTable';
import { useCouples } from './useCouples';
import { useToast } from '@/hooks/use-toast';
import CoupleFormDialog from './CoupleFormDialog';

interface CouplesListProps {
  searchTerm: string;
}

export default function CouplesList({ searchTerm }: CouplesListProps) {
  const [editingCouple, setEditingCouple] = useState<Couple | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { couples, isLoading, error, refresh } = useCouples(searchTerm);
  const { toast } = useToast();

  const handleEdit = (couple: Couple) => {
    setEditingCouple(couple);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      // Simulação de delay para feedback visual
      await new Promise(resolve => setTimeout(resolve, 500));
      // Chamar a função de refresh para buscar os dados atualizados
      refresh();

      toast({
        title: "Casal removido",
        description: "O cadastro do casal foi removido com sucesso.",
      });
    } catch (err: any) {
      toast({
        title: "Erro ao remover casal",
        description: err.message || "Ocorreu um erro ao remover o casal.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (error) {
    toast({
      title: "Erro ao buscar casais",
      description: error,
      variant: "destructive"
    });
  }

  return (
    <div>
      <CouplesTable
        couples={couples}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      <CoupleFormDialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCouple(null);
          refresh();
        }}
        // Se quiser passar editingCouple como inicialização, altere a tipagem de CoupleFormDialog e trate internamente
      />
    </div>
  );
}
