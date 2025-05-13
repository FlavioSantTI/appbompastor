
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/layout/MainLayout";
import AdminRoute from "@/components/AdminRoute";
import EventosList from "./components/EventosList";
import EventoForm from "./components/EventoForm";
import EventoInscritos from "./components/EventoInscritos";
import { Evento } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus } from "lucide-react";

const EventosAdmin = () => {
  const { toast } = useToast();
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showInscritos, setShowInscritos] = useState(false);

  const handleNewEvento = () => {
    setSelectedEvento(null);
    setShowForm(true);
    setShowInscritos(false);
  };

  const handleEditEvento = (evento: Evento) => {
    setSelectedEvento(evento);
    setShowForm(true);
    setShowInscritos(false);
  };

  const handleShowInscritos = (evento: Evento) => {
    setSelectedEvento(evento);
    setShowInscritos(true);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    toast({
      title: selectedEvento ? "Evento atualizado" : "Evento criado",
      description: selectedEvento
        ? "O evento foi atualizado com sucesso."
        : "O evento foi criado com sucesso.",
    });
  };

  const handleBackToList = () => {
    setShowForm(false);
    setShowInscritos(false);
  };

  return (
    <MainLayout>
      <AdminRoute>
        <div className="container mx-auto py-8 px-4">
          {!showForm && !showInscritos ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
                  Gerenciamento de Eventos
                </CardTitle>
                <Button onClick={handleNewEvento}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Novo Evento
                </Button>
              </CardHeader>
              <CardContent>
                <EventosList
                  onEdit={handleEditEvento}
                  onInscritos={handleShowInscritos}
                />
              </CardContent>
            </Card>
          ) : showForm ? (
            <EventoForm
              evento={selectedEvento}
              onSuccess={handleFormSuccess}
              onCancel={handleBackToList}
            />
          ) : showInscritos && selectedEvento ? (
            <EventoInscritos
              evento={selectedEvento}
              onBack={handleBackToList}
            />
          ) : null}
        </div>
      </AdminRoute>
    </MainLayout>
  );
};

export default EventosAdmin;
