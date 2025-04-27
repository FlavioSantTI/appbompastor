
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CouplesTable from './CouplesTable';
import SearchBar from './SearchBar';
import CoupleDialog from './CoupleDialog';
import type { Couple } from './types';

interface CouplesListProps {
  searchTerm: string;
}

export default function CouplesList({ searchTerm }: CouplesListProps) {
  const [couples, setCouples] = useState<Couple[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCouple, setSelectedCouple] = useState<Couple | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCouples();
  }, [searchTerm]);

  const fetchCouples = async () => {
    try {
      const { data, error } = await supabase
        .from('inscricoes')
        .select(`
          id_inscricao,
          codigo_casal,
          data_hora_inscricao,
          esposa:pessoas(nome_completo),
          esposo:pessoas(nome_completo)
        `)
        .or(`esposa.nome_completo.ilike.%${searchTerm}%,esposo.nome_completo.ilike.%${searchTerm}%`)
        .order('data_hora_inscricao', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Couple type
      const transformedData = data.map((item) => ({
        ...item,
        esposa: Array.isArray(item.esposa) ? item.esposa[0] : item.esposa,
        esposo: Array.isArray(item.esposo) ? item.esposo[0] : item.esposo,
      }));

      setCouples(transformedData);
    } catch (error) {
      console.error('Error fetching couples:', error);
      toast({
        title: "Erro ao carregar casais",
        description: "Ocorreu um erro ao carregar a lista de casais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('inscricoes')
        .delete()
        .eq('id_inscricao', id);

      if (error) throw error;

      toast({
        title: "Casal removido",
        description: "A inscrição foi removida com sucesso.",
      });
      
      fetchCouples();
    } catch (error) {
      console.error('Error deleting couple:', error);
      toast({
        title: "Erro ao remover",
        description: "Ocorreu um erro ao remover a inscrição.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <CouplesTable 
        couples={couples}
        onEdit={setSelectedCouple}
        onDelete={handleDelete}
      />

      <CoupleDialog
        couple={selectedCouple}
        onClose={() => setSelectedCouple(null)}
        onUpdate={fetchCouples}
      />
    </>
  );
}
