
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import CouplesTable from './CouplesTable';
import { Couple } from './types';

interface CouplesListProps {
  searchTerm: string;
}

export default function CouplesList({ searchTerm }: CouplesListProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCouple, setSelectedCouple] = useState<Couple | null>(null);

  const fetchCouples = async () => {
    try {
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
    setSelectedCouple(couple);
    setDialogOpen(true);
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

  return (
    <div>
      <CouplesTable 
        couples={filteredCouples}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
