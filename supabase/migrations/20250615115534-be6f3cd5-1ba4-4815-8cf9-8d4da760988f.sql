
-- 1. Apagar filhos ligados a inscrições de teste/dummy
DELETE FROM public.filhos
WHERE id_inscricao IN (
  SELECT id_inscricao FROM public.inscricoes
  WHERE codigo_casal IN (
    SELECT codigo_casal FROM public.inscricoes
    WHERE
      paroquia_frequentada ILIKE '%teste%' OR
      contato_emergencia ILIKE '%teste%' OR
      observacoes ILIKE '%teste%' OR
      telefone_emergencia ILIKE '%0000%' OR
      telefone_emergencia ILIKE '%9999%' OR
      telefone_emergencia ILIKE '%12345%'
  )
);

-- 2. Apagar endereços de inscrições teste/dummy
DELETE FROM public.enderecos
WHERE id_inscricao IN (
  SELECT id_inscricao FROM public.inscricoes
  WHERE
    paroquia_frequentada ILIKE '%teste%' OR
    observacoes ILIKE '%teste%'
);

-- 3. Apagar pessoas cujos nomes/emails/telefones são padrão de teste/dummy
DELETE FROM public.pessoas
WHERE
  nome_completo ILIKE '%teste%'
  OR nome_completo ILIKE '%test%'
  OR nome_completo ILIKE '%admin%'
  OR nome_completo ILIKE '%exemplo%'
  OR nome_completo ILIKE '%asdf%'
  OR nome_completo ILIKE 'aaa%'
  OR email ILIKE '%teste%'
  OR email ILIKE '%admin%'
  OR email ILIKE '%exemplo%'
  OR email ILIKE '%dummy%'
  OR email ILIKE '%123%'
  OR telefone LIKE '%0000'
  OR telefone LIKE '%9999'
  OR telefone LIKE '%1111'
  OR telefone LIKE '%12345';

-- 4. Apagar inscrições cujos emails, nomes, paroquia, telefone são de teste/dummy
DELETE FROM public.inscricoes
WHERE
  paroquia_frequentada ILIKE '%teste%'
  OR contato_emergencia ILIKE '%teste%'
  OR observacoes ILIKE '%teste%'
  OR telefone_emergencia ILIKE '%9999%'
  OR telefone_emergencia ILIKE '%0000%'
  OR telefone_emergencia ILIKE '%12345%'
  OR codigo_casal IN (0000, 9999, 1234);

-- 5. Apagar eventuais endereços ou filhos órfãos
DELETE FROM public.enderecos
WHERE id_inscricao IS NULL
   OR id_inscricao NOT IN (SELECT id_inscricao FROM public.inscricoes);

DELETE FROM public.filhos
WHERE id_inscricao IS NULL
   OR id_inscricao NOT IN (SELECT id_inscricao FROM public.inscricoes);

-- 6. Apagar pessoas órfãs (sem inscrição)
DELETE FROM public.pessoas
WHERE id_inscricao IS NULL
   OR id_inscricao NOT IN (SELECT id_inscricao FROM public.inscricoes);

