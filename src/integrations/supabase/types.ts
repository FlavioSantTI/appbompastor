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
      enderecos: {
        Row: {
          cidade: string | null
          endereco_completo: string | null
          estado: string | null
          id_endereco: number
          id_inscricao: number | null
        }
        Insert: {
          cidade?: string | null
          endereco_completo?: string | null
          estado?: string | null
          id_endereco?: number
          id_inscricao?: number | null
        }
        Update: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
