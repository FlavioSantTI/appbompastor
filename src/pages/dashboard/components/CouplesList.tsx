
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import CouplesTable from './CouplesTable';
import { Couple } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CoupleDialog from './CoupleDialog';

interface CouplesListProps {
  searchTerm: string;
}

export default function CouplesList({ searchTerm }: CouplesListProps) {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCouple, setSelectedCouple] = useState<Couple | null>(null);

  const fetchCouples = async () => {
    try {
      if (!isAdmin) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar estes dados.",
          variant: "destructive",
        });
        return [];
      }

      let query = supabase
        .from('inscricoes')
        .select(`
          id_inscricao,
          codigo_casal,
          data_hora_inscricao,
          pessoas!pessoas_id_inscricao_fkey (
            nome_completo,
            tipo_conjuge,
            sexo
          )
        `);

      const { data, error } = await query;

      if (error) throw error;

      // Processar os dados para o formato correto
      const formattedCouples: Couple[] = data.map((row: any) => {
        // Separar em esposo e esposa
        const esposo = row.pessoas?.find((p: any) => p.sexo === 'M') || null;
        const esposa = row.pessoas?.find((p: any) => p.sexo === 'F') || null;

        return {
          id_inscricao: row.id_inscricao,
          codigo_casal: row.codigo_casal,
          esposa: esposa ? { nome_completo: esposa.nome_completo } : null,
          esposo: esposo ? { nome_completo: esposo.nome_completo } : null,
          data_hora_inscricao: row.data_hora_inscricao
        };
      });

      return formattedCouples;
    } catch (error: any) {
      toast({
        title: "Erro ao carregar casais",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  const { data: couples = [], isLoading, refetch } = useQuery({
    queryKey: ['couples'],
    queryFn: fetchCouples,
  });

  const handleDelete = async (id: number) => {
    try {
      if (!isAdmin) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para esta ação.",
          variant: "destructive",
        });
        return;
      }

      setIsDeleting(id);

      const { error } = await supabase
        .from('inscricoes')
        .delete()
        .eq('id_inscricao', id);

      if (error) throw error;

      toast({
        title: "Casal removido",
        description: "O casal foi removido com sucesso",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Erro ao remover casal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (couple: Couple) => {
    if (!isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para esta ação.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCouple(couple);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCouple(null);
  };

  // Filtrar casais baseado no termo de busca
  const filteredCouples = couples.filter((couple) => {
    const searchTermLower = searchTerm.toLowerCase();
    const esposaName = couple.esposa?.nome_completo?.toLowerCase() || '';
    const esposoName = couple.esposo?.nome_completo?.toLowerCase() || '';
    
    return (
      esposaName.includes(searchTermLower) ||
      esposoName.includes(searchTermLower) ||
      String(couple.codigo_casal).includes(searchTermLower)
    );
  });

  if (!isAdmin) {
    return (
      <Alert className="mt-6" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Acesso negado</AlertTitle>
        <AlertDescription>
          Você não possui permissão para acessar o gerenciamento de inscrições.
          Entre em contato com um administrador para obter acesso.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <CouplesTable 
        couples={filteredCouples}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      
      {dialogOpen && (
        <CoupleDialog
          couple={selectedCouple}
          onClose={handleCloseDialog}
          onUpdate={refetch}
        />
      )}
    </div>
  );
}
