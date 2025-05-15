
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Calendar, LayoutDashboard, FileText, ListCheck } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <AdminRoute>
        <div className="container mx-auto py-8">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Como administrador, você tem acesso a recursos adicionais para gerenciar o encontro.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Gerenciar Inscrições</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                        Gerencie inscrições e casais participantes do encontro.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate("/dashboard")}
                      >
                        Acessar Inscrições
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Gerenciar Eventos</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                        Organize e administre eventos e encontros.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate("/admin/eventos")}
                      >
                        Acessar Eventos
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Relatórios</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                        Visualize dados e métricas sobre os eventos e participantes.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled
                      >
                        Em breve
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <ListCheck className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Verificação de Inscritos</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                        Confirme presença e gerencie lista de espera.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled
                      >
                        Em breve
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <LayoutDashboard className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Configurações</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
                        Ajuste as configurações do sistema e dos eventos.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled
                      >
                        Em breve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminRoute>
    </MainLayout>
  );
};

export default AdminDashboard;
