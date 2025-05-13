
import { supabase } from '@/integrations/supabase/client';
import { WifeData } from '@/features/form/components/WifeForm';
import { HusbandData } from '@/features/form/components/HusbandForm';
import { CoupleData } from '@/features/form/components/CoupleForm';

export const submitCoupleForm = async (
  wifeData: WifeData, 
  husbandData: HusbandData, 
  coupleData: CoupleData
): Promise<number> => {
  // 1. Inserir a inscrição do casal
  const { data: inscricaoData, error: inscricaoError } = await supabase
    .from('inscricoes')
    .insert({
      codigo_casal: Math.floor(1000 + Math.random() * 9000), // Código aleatório
      paroquia_frequentada: coupleData.parish,
      tempo_uniao: coupleData.unionTime ? parseInt(coupleData.unionTime) : null,
      data_hora_inscricao: new Date().toISOString(),
      contato_emergencia: coupleData.emergencyContact,
      telefone_emergencia: coupleData.emergencyPhone
    })
    .select();

  if (inscricaoError) throw inscricaoError;
  
  const inscricaoId = inscricaoData[0].id_inscricao;
  
  // 2. Inserir endereço - Usando o nome de coluna correto 'cep'
  const { error: enderecoError } = await supabase
    .from('enderecos')
    .insert({
      id_inscricao: inscricaoId,
      endereco_completo: coupleData.address,
      cidade: coupleData.city,
      estado: coupleData.state,
      cep: coupleData.zipCode
    });
  
  if (enderecoError) throw enderecoError;
  
  // 3. Inserir dados da esposa
  const { data: esposaData, error: esposaError } = await supabase
    .from('pessoas')
    .insert({
      id_inscricao: inscricaoId,
      nome_completo: wifeData.name,
      nome_cracha: wifeData.nickname,
      data_nascimento: wifeData.birthdate,
      telefone: wifeData.phone,
      email: wifeData.email,
      tipo_conjuge: 'esposa',
      sexo: 'F',
      nova_uniao: wifeData.newUnion === 'yes'
    })
    .select();
  
  if (esposaError) throw esposaError;
  
  // 4. Inserir dados do esposo
  const { data: esposoData, error: esposoError } = await supabase
    .from('pessoas')
    .insert({
      id_inscricao: inscricaoId,
      nome_completo: husbandData.name,
      nome_cracha: husbandData.nickname,
      data_nascimento: husbandData.birthdate,
      telefone: husbandData.phone,
      email: husbandData.email,
      tipo_conjuge: 'esposo',
      sexo: 'M',
      nova_uniao: husbandData.newUnion === 'yes'
    })
    .select();
  
  if (esposoError) throw esposoError;
  
  // 5. Inserir filhos, se houver
  if (coupleData.children.length > 0) {
    const filhosData = coupleData.children.map(child => ({
      id_inscricao: inscricaoId,
      nome: child.name,
      idade: parseInt(child.age),
      necessita_creche: child.needsDaycare
    }));
    
    const { error: filhosError } = await supabase
      .from('filhos')
      .insert(filhosData);
    
    if (filhosError) throw filhosError;
  }
  
  return inscricaoId;
};
