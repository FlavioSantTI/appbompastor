
export interface Couple {
  id_inscricao: number;
  codigo_casal: number;
  esposa: { nome_completo: string } | null;
  esposo: { nome_completo: string } | null;
  data_hora_inscricao: string;
}
