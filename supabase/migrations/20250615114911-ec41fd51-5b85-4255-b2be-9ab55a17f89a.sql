
-- 1. Renomear tabela statusInscricao para snake_case
ALTER TABLE public."statusInscricao" RENAME TO status_inscricao;

-- 2. Corrigir nome de coluna Descricao para descricao
ALTER TABLE public.status_inscricao RENAME COLUMN "Descricao" TO descricao;

-- 3. Ativar RLS para tabelas sensíveis (exemplo nas principais; ajuste/remova da lista se desejar)
ALTER TABLE public.casal_evento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pessoas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enderecos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.filhos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_inscricao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- 4. Corrigir tipos de dados inadequados (ajustando telefone, email e outros que devem ser varchar/text; sem alteração, pois os principais já estão adequados)
-- Se identificar outros campos a ajustar, aviso a seguir!

-- 5. Corrigir nomes snake_case para demais tabelas/colunas (sugestão; execute após avaliar se deseja modificar mais nomes)
-- Nenhuma tabela fora do padrão principal foi encontrada além de statusInscricao/status_inscricao.

-- (Opcional, revisar/remover campos/tabelas após sua aprovação na análise dos dados).
