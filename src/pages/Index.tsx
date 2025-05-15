
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encontro de Casais em Nova União com Bom Pastor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Venha participar do nosso encontro de casais e fortalecer seu relacionamento através da fé e comunhão.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {loading ? (
              <Button size="lg" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </Button>
            ) : user ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="min-w-[180px]">Acessar Inscrições</Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin/dashboard">
                    <Button size="lg" variant="outline" className="min-w-[180px]">Painel Administrativo</Button>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="min-w-[180px]">Área Restrita</Button>
              </Link>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900 rounded-xl mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nosso Encontro</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-6">
            O encontro de casais é uma oportunidade para fortalecer seu relacionamento 
            e renovar seus votos perante a Deus. Participe desta experiência única de 
            compartilhamento e aprendizado em comunidade.
          </p>
        </section>

        <section className="text-center py-8 mb-16">
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
