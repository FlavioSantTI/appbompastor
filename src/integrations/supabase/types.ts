export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      casal_evento: {
        Row: {
          data_inscricao: string
          id: string
          id_evento: string
          id_inscricao: number
          observacoes: string | null
          status_inscricao: string | null
        }
        Insert: {
          data_inscricao?: string
          id?: string
          id_evento: string
          id_inscricao: number
          observacoes?: string | null
          status_inscricao?: string | null
        }
        Update: {
          data_inscricao?: string
          id?: string
          id_evento?: string
          id_inscricao?: number
          observacoes?: string | null
          status_inscricao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "casal_evento_id_evento_fkey"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casal_evento_id_inscricao_fkey"
            columns: ["id_inscricao"]
            isOneToOne: false
            referencedRelation: "inscricoes"
            referencedColumns: ["id_inscricao"]
          },
          {
            foreignKeyName: "fk_casal_evento_evento"
            columns: ["id_evento"]
            isOneToOne: false
            referencedRelation: "eventos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_casal_evento_inscricao"
            columns: ["id_inscricao"]
            isOneToOne: false
            referencedRelation: "inscricoes"
            referencedColumns: ["id_inscricao"]
          },
        ]
      }
      enderecos: {
        Row: {
          cep: string | null
          cidade: string | null
          endereco_completo: string | null
          estado: string | null
          id_endereco: number
          id_inscricao: number | null
        }
        Insert: {
          cep?: string | null
          cidade?: string | null
          endereco_completo?: string | null
          estado?: string | null
          id_endereco?: number
          id_inscricao?: number | null
        }
        Update: {
          cep?: string | null
          cidade?: string | null
          endereco_completo?: string | null
          estado?: string | null
          id_endereco?: number
          id_inscricao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "enderecos_id_inscricao_fkey"
            columns: ["id_inscricao"]
            isOneToOne: false
            referencedRelation: "inscricoes"
            referencedColumns: ["id_inscricao"]
          },
        ]
      }
      estado: {
        Row: {
          codigouf: number
          nome: string
          regiao: number
          uf: string
        }
        Insert: {
          codigouf: number
          nome: string
          regiao: number
          uf: string
        }
        Update: {
          codigouf?: number
          nome?: string
          regiao?: number
          uf?: string
        }
        Relationships: []
      }
      eventos: {
        Row: {
          cidade: string
          criado_em: string | null
          data_fim: string
          data_inicio: string
          estado: string
          hora_fim: string
          hora_inicio: string
          id: string
          local: string
          titulo: string
        }
        Insert: {
          cidade: string
          criado_em?: string | null
          data_fim: string
          data_inicio: string
          estado: string
          hora_fim: string
          hora_inicio: string
          id?: string
          local: string
          titulo: string
        }
        Update: {
          cidade?: string
          criado_em?: string | null
          data_fim?: string
          data_inicio?: string
          estado?: string
          hora_fim?: string
          hora_inicio?: string
          id?: string
          local?: string
          titulo?: string
        }
        Relationships: []
      }
      filhos: {
        Row: {
          id_filho: number
          id_inscricao: number | null
          idade: number | null
          necessita_creche: boolean | null
          nome: string | null
        }
        Insert: {
          id_filho?: number
          id_inscricao?: number | null
          idade?: number | null
          necessita_creche?: boolean | null
          nome?: string | null
        }
        Update: {
          id_filho?: number
          id_inscricao?: number | null
          idade?: number | null
          necessita_creche?: boolean | null
          nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "filhos_id_inscricao_fkey"
            columns: ["id_inscricao"]
            isOneToOne: false
            referencedRelation: "inscricoes"
            referencedColumns: ["id_inscricao"]
          },
        ]
      }
      inscricoes: {
        Row: {
          codigo_casal: number
          contato_emergencia: string | null
          data_hora_inscricao: string | null
          id_inscricao: number
          necessita_creche: boolean | null
          observacoes: string | null
          paroquia_frequentada: string | null
          pontuacao: number | null
          status_visita: string | null
          telefone_emergencia: string | null
          tempo_uniao: number | null
        }
        Insert: {
          codigo_casal: number
          contato_emergencia?: string | null
          data_hora_inscricao?: string | null
          id_inscricao?: number
          necessita_creche?: boolean | null
          observacoes?: string | null
          paroquia_frequentada?: string | null
          pontuacao?: number | null
          status_visita?: string | null
          telefone_emergencia?: string | null
          tempo_uniao?: number | null
        }
        Update: {
          codigo_casal?: number
          contato_emergencia?: string | null
          data_hora_inscricao?: string | null
          id_inscricao?: number
          necessita_creche?: boolean | null
          observacoes?: string | null
          paroquia_frequentada?: string | null
          pontuacao?: number | null
          status_visita?: string | null
          telefone_emergencia?: string | null
          tempo_uniao?: number | null
        }
        Relationships: []
      }
      movimentos_igreja: {
        Row: {
          descricao: string | null
          id_movimento: number
          id_pessoa: number | null
          nome_movimento: string | null
        }
        Insert: {
          descricao?: string | null
          id_movimento?: number
          id_pessoa?: number | null
          nome_movimento?: string | null
        }
        Update: {
          descricao?: string | null
          id_movimento?: number
          id_pessoa?: number | null
          nome_movimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentos_igreja_id_pessoa_fkey"
            columns: ["id_pessoa"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id_pessoa"]
          },
        ]
      }
      municipio: {
        Row: {
          codigo: number
          nome: string
          uf: string
        }
        Insert: {
          codigo: number
          nome: string
          uf: string
        }
        Update: {
          codigo?: number
          nome?: string
          uf?: string
        }
        Relationships: []
      }
      pessoa_sacramento: {
        Row: {
          id_pessoa: number
          id_sacramento: number
        }
        Insert: {
          id_pessoa: number
          id_sacramento: number
        }
        Update: {
          id_pessoa?: number
          id_sacramento?: number
        }
        Relationships: [
          {
            foreignKeyName: "pessoa_sacramento_id_pessoa_fkey"
            columns: ["id_pessoa"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id_pessoa"]
          },
          {
            foreignKeyName: "pessoa_sacramento_id_sacramento_fkey"
            columns: ["id_sacramento"]
            isOneToOne: false
            referencedRelation: "sacramentos"
            referencedColumns: ["id_sacramento"]
          },
        ]
      }
      pessoas: {
        Row: {
          data_nascimento: string | null
          email: string | null
          id_inscricao: number | null
          id_pessoa: number
          nome_completo: string
          nome_cracha: string | null
          nova_uniao: boolean | null
          sexo: string | null
          telefone: string | null
          tipo_conjuge: string | null
        }
        Insert: {
          data_nascimento?: string | null
          email?: string | null
          id_inscricao?: number | null
          id_pessoa?: number
          nome_completo: string
          nome_cracha?: string | null
          nova_uniao?: boolean | null
          sexo?: string | null
          telefone?: string | null
          tipo_conjuge?: string | null
        }
        Update: {
          data_nascimento?: string | null
          email?: string | null
          id_inscricao?: number | null
          id_pessoa?: number
          nome_completo?: string
          nome_cracha?: string | null
          nova_uniao?: boolean | null
          sexo?: string | null
          telefone?: string | null
          tipo_conjuge?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pessoas_id_inscricao_fkey"
            columns: ["id_inscricao"]
            isOneToOne: false
            referencedRelation: "inscricoes"
            referencedColumns: ["id_inscricao"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      sacramentos: {
        Row: {
          id_sacramento: number
          nome_sacramento: string
        }
        Insert: {
          id_sacramento?: number
          nome_sacramento: string
        }
        Update: {
          id_sacramento?: number
          nome_sacramento?: string
        }
        Relationships: []
      }
      statusInscricao: {
        Row: {
          created_at: string
          Descricao: string | null
          id: number
        }
        Insert: {
          created_at?: string
          Descricao?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          Descricao?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_complete_schema: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
