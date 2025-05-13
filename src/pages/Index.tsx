
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldAlert, Calendar, Users, ClipboardCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center mb-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Encontro de Casais em Nova União com Bom Pastor
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Venha participar do nosso encontro de casais e fortalecer seu relacionamento através da fé e comunhão.
            </p>
            
            <div className="pt-4">
              {loading ? (
                <Button size="lg" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </Button>
              ) : user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="mr-4">Acessar Dashboard</Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg">Área Restrita</Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1769&auto=format&fit=crop" 
              alt="Encontro de Casais" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </section>

        <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-xl mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nosso Encontro</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              O encontro de casais é uma oportunidade para fortalecer seu relacionamento e renovar seus votos perante a Deus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Programação</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Três dias de atividades para renovar sua união matrimonial.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comunidade</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compartilhe experiências com outros casais e fortaleça sua fé.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <ClipboardCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Inscrição</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Processo simplificado para participar do próximo encontro.
              </p>
            </div>
          </div>
        </section>

        {isAdmin && (
          <section className="mb-12">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                Área Administrativa
              </h2>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Como administrador, você tem acesso a recursos adicionais para gerenciar o encontro.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button variant="outline">Gerenciar Inscrições</Button>
                </Link>
                <Link to="/admin/eventos">
                  <Button variant="outline">Gerenciar Eventos</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Tem dúvidas sobre o encontro? Entre em contato com nossa equipe para mais informações.
          </p>
          <Button>Fale Conosco</Button>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
