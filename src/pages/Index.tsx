
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Encontro de Casais em Nova União com Bom Pastor</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Sistema de gerenciamento de inscrições para o encontro de casais
          </p>

          <div className="flex justify-center gap-4 pt-4">
            {loading ? (
              <Button size="lg" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
            ) : user ? (
              isAdmin ? (
                <Link to="/dashboard">
                  <Button size="lg">Acessar Dashboard</Button>
                </Link>
              ) : (
                <Alert className="max-w-md mx-auto">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Acesso limitado</AlertTitle>
                  <AlertDescription>
                    Você está logado, mas não possui permissões de administrador.
                    Entre em contato com um administrador para solicitar acesso.
                  </AlertDescription>
                </Alert>
              )
            ) : (
              <Link to="/auth">
                <Button size="lg">Área Restrita</Button>
              </Link>
            )}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-2 p-6 bg-white dark:bg-gray-950 rounded-lg shadow">
            <h2 className="text-xl font-bold">Gerenciamento de Inscrições</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cadastre e gerencie inscrições de casais para o encontro.
            </p>
          </div>

          <div className="space-y-2 p-6 bg-white dark:bg-gray-950 rounded-lg shadow">
            <h2 className="text-xl font-bold">Acompanhamento</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Acompanhe o status das inscrições e gerencie os dados dos casais.
            </p>
          </div>

          <div className="space-y-2 p-6 bg-white dark:bg-gray-950 rounded-lg shadow">
            <h2 className="text-xl font-bold">Relatórios</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gere relatórios e estatísticas sobre os casais inscritos.
            </p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
