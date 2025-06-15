
-- Adicionar FK entre casal_evento.id_inscricao e inscricoes.id_inscricao
ALTER TABLE public.casal_evento
ADD CONSTRAINT fk_casal_evento_inscricao
FOREIGN KEY (id_inscricao)
REFERENCES public.inscricoes(id_inscricao)
ON DELETE CASCADE;

-- Adicionar FK entre casal_evento.id_evento e eventos.id
ALTER TABLE public.casal_evento
ADD CONSTRAINT fk_casal_evento_evento
FOREIGN KEY (id_evento)
REFERENCES public.eventos(id)
ON DELETE CASCADE;
