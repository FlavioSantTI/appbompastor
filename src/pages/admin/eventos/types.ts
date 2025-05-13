
export interface Evento {
  id: string;
  titulo: string;
  data_inicio: string;
  data_fim: string;
  hora_inicio: string;
  hora_fim: string;
  local: string;
  cidade: string;
  estado: string;
  criado_em?: string;
}

export interface EventoFormData {
  titulo: string;
  data_inicio: string;
  data_fim: string;
  hora_inicio: string;
  hora_fim: string;
  local: string;
  cidade: string;
  estado: string;
}

export interface CasalEvento {
  id: string;
  id_inscricao: number;
  id_evento: string;
  data_inscricao: string;
  presente: boolean;
  observacoes?: string;
  casal?: {
    codigo_casal: number;
    esposo?: { nome_completo: string };
    esposa?: { nome_completo: string };
  };
}
