
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CouplesList from './components/CouplesList';
import MainLayout from '@/layout/MainLayout';
import CoupleForm from './components/CoupleForm';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b">
            <CardTitle className="text-2xl">
              {isAdmin ? "Gerenciamento de Inscrições" : "Minha Inscrição"}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isAdmin 
                ? "Cadastre e gerencie inscrições de casais para o encontro." 
                : "Visualize e acompanhe sua inscrição para o encontro."}
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <Button 
                onClick={handleOpenForm} 
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {isAdmin ? "Adicionar Casal" : "Incluir Inscrição"}
              </Button>
              
              {isAdmin && (
                <div className="relative w-full md:w-64">
                  <Input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              )}
            </div>
            
            <CouplesList searchTerm={searchTerm} />
            
            {isFormOpen && <CoupleForm open={isFormOpen} onClose={handleCloseForm} />}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
