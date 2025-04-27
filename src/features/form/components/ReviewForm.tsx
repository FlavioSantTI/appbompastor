
import React from 'react';
import { WifeData } from './WifeForm';
import { HusbandData } from './HusbandForm';
import { CoupleData } from './CoupleForm';
import { CURRENT_DATE } from '@/core/constants';

interface ReviewFormProps {
  wifeData: WifeData;
  husbandData: HusbandData;
  coupleData: CoupleData;
  termsAccepted: boolean;
  onAcceptTerms: (accepted: boolean) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  wifeData,
  husbandData,
  coupleData,
  termsAccepted,
  onAcceptTerms,
}) => {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 flutter-gradient bg-clip-text text-transparent">{title}</h3>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string | string[] }) => (
    <div className="py-1">
      <span className="font-medium">{label}:</span>{' '}
      <span>{Array.isArray(value) ? value.join(', ') || 'Nenhum' : value || 'Não informado'}</span>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Revisão da Inscrição</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Por favor, revise todos os dados fornecidos antes de finalizar sua inscrição.
      </p>

      <div className="mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">Data de Inscrição:</span> {CURRENT_DATE}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">Status:</span> Pendente
        </p>
      </div>

      <Section title="Dados da Esposa">
        <Field label="Nome" value={wifeData.name} />
        <Field label="Apelido" value={wifeData.nickname} />
        <Field label="Data de Nascimento" value={wifeData.birthdate} />
        <Field label="Telefone" value={wifeData.phone} />
        <Field label="Email" value={wifeData.email} />
        <Field label="Sacramentos" value={wifeData.sacraments} />
        <Field label="Movimentos na Igreja" value={wifeData.movements} />
        <Field label="Nova União" value={wifeData.newUnion === 'yes' ? 'Sim' : 'Não'} />
      </Section>

      <Section title="Dados do Esposo">
        <Field label="Nome" value={husbandData.name} />
        <Field label="Apelido" value={husbandData.nickname} />
        <Field label="Data de Nascimento" value={husbandData.birthdate} />
        <Field label="Telefone" value={husbandData.phone} />
        <Field label="Email" value={husbandData.email} />
        <Field label="Sacramentos" value={husbandData.sacraments} />
        <Field label="Movimentos na Igreja" value={husbandData.movements} />
        <Field label="Nova União" value={husbandData.newUnion === 'yes' ? 'Sim' : 'Não'} />
      </Section>

      <Section title="Dados do Casal">
        <Field label="Endereço" value={coupleData.address} />
        <Field label="Cidade" value={coupleData.city} />
        <Field label="Estado" value={coupleData.state} />
        <Field label="CEP" value={coupleData.zipCode} />
        <Field label="Tempo de União" value={coupleData.unionTime} />
        <Field label="Paróquia" value={coupleData.parish} />
        
        <h4 className="font-medium mt-3 mb-2">Filhos</h4>
        {coupleData.children.length > 0 ? (
          coupleData.children.map((child, index) => (
            <div key={index} className="ml-4 mb-2">
              <p>
                <span className="font-medium">Filho {index + 1}:</span> {child.name}, {child.age} anos
                {child.needsDaycare ? ' (Necessita de creche)' : ''}
              </p>
            </div>
          ))
        ) : (
          <p className="ml-4">Nenhum filho informado</p>
        )}
        
        <h4 className="font-medium mt-3 mb-2">Contato de Emergência</h4>
        <p className="ml-4">
          {coupleData.emergencyContact} - {coupleData.emergencyPhone}
        </p>
      </Section>

      <div className="mt-8 flex items-start">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => onAcceptTerms(e.target.checked)}
          className="mt-1 w-4 h-4 text-flutter-primary focus:ring-flutter-primary rounded cursor-pointer"
        />
        <label htmlFor="terms" className="ml-2 text-slate-700 dark:text-slate-300">
          Declaro que li e conferi todos os dados fornecidos acima e estou ciente de que as informações são de minha responsabilidade. Autorizo o uso destes dados para fins de organização do evento.
        </label>
      </div>
    </div>
  );
};

export default ReviewForm;
