
import React from 'react';
import MainLayout from '@/layout/MainLayout';
import FormContainer from '@/features/form/FormContainer';

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flutter-gradient bg-clip-text text-transparent animate-fade-in">
            Formulário de Inscrição Matrimonial
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-slide-in">
            Preencha o formulário abaixo com todas as informações do casal para inscrição no evento.
            Todos os dados são confidenciais e serão usados apenas para fins organizacionais.
          </p>
        </div>
        
        <FormContainer />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Dúvidas Frequentes</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flutter-card p-6 mb-4">
              <h3 className="font-semibold mb-2">O que acontece após a inscrição?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Após o envio do formulário, nossa equipe irá revisar suas informações e você receberá um email de confirmação em até 48 horas.
              </p>
            </div>
            
            <div className="flutter-card p-6 mb-4">
              <h3 className="font-semibold mb-2">Posso editar minha inscrição depois?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sim! Após efetuar o login no sistema, você terá acesso para editar suas informações até 7 dias antes do evento.
              </p>
            </div>
            
            <div className="flutter-card p-6">
              <h3 className="font-semibold mb-2">Como funciona o serviço de creche?</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Oferecemos serviço de creche para crianças até 12 anos. É importante informar corretamente a idade das crianças para que possamos organizar atividades adequadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
