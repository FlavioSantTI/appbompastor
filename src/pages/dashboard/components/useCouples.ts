
import { useState, useEffect } from 'react';
import { Couple } from './types';
import { supabase } from '@/integrations/supabase/client';

interface UseCouplesResult {
  couples: Couple[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useCouples(searchTerm: string): UseCouplesResult {
  const [couples, setCouples] = useState<Couple[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCouples = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Ajuste para filtrar pelo searchTerm (nome esposo/esposa)
      let query = supabase
        .from('inscricoes')
        .select(`
          id_inscricao,
          codigo_casal,
          data_hora_inscricao,
          pessoas!pessoas_id_inscricao_fkey (
            nome_completo,
            sexo
          )
        `);

      const { data, error } = await query;
      if (error) throw error;

      // Mapear esposo/esposa
      const couples = data.map((item: any) => {
        const esposo = item.pessoas.find((p: any) => p.sexo === 'M');
        const esposa = item.pessoas.find((p: any) => p.sexo === 'F');
        return {
          id_inscricao: item.id_inscricao,
          codigo_casal: item.codigo_casal,
          data_hora_inscricao: item.data_hora_inscricao,
          esposo: esposo ? { nome_completo: esposo.nome_completo } : null,
          esposa: esposa ? { nome_completo: esposa.nome_completo } : null,
        };
      });

      // Filtro por searchTerm local para evitar back-and-forth no supabase
      let filtered = couples;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        filtered = couples.filter(
          (c) =>
            c.esposo?.nome_completo?.toLowerCase().includes(s) ||
            c.esposa?.nome_completo?.toLowerCase().includes(s) ||
            c.codigo_casal?.toString().includes(s)
        );
      }

      setCouples(filtered);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar casais');
      setCouples([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCouples();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return {
    couples,
    isLoading,
    error,
    refresh: fetchCouples,
  };
}
