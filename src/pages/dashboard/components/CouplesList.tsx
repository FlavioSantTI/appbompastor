
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { edit, trash2 } from 'lucide-react';
import CoupleDialog from './CoupleDialog';

interface CouplesListProps {
  searchTerm: string;
}

interface Couple {
  id_inscricao: number;
  codigo_casal: number;
  esposa: { nome_completo: string } | null;
  esposo: { nome_completo: string } | null;
  data_hora_inscricao: string;
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
      setCouples(data || []);
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Esposa</TableHead>
            <TableHead>Esposo</TableHead>
            <TableHead>Data de Inscrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {couples.map((couple) => (
            <TableRow key={couple.id_inscricao}>
              <TableCell>{couple.codigo_casal}</TableCell>
              <TableCell>{couple.esposa?.nome_completo}</TableCell>
              <TableCell>{couple.esposo?.nome_completo}</TableCell>
              <TableCell>
                {new Date(couple.data_hora_inscricao).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedCouple(couple)}
                  >
                    <edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(couple.id_inscricao)}
                  >
                    <trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CoupleDialog
        couple={selectedCouple}
        onClose={() => setSelectedCouple(null)}
        onUpdate={fetchCouples}
      />
    </>
  );
}
