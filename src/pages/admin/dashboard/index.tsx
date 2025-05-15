
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AdminRoute from "@/components/AdminRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Calendar, LayoutDashboard } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <AdminRoute>
        <div className="container mx-auto py-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="border-b bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Como administrador, você tem acesso a recursos adicionais para gerenciar o encontro.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-gray-800 border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Gerenciar Inscrições</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
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

                <Card className="bg-white dark:bg-gray-800 border hover:border-primary hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Gerenciar Eventos</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
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
              </div>

              <div className="mt-8">
                <Card className="border-dashed border-gray-300 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Relatórios e Estatísticas</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Visualize dados e métricas sobre os eventos e participantes.
                        </p>
                      </div>
                      <Button variant="outline" disabled>Em breve</Button>
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
