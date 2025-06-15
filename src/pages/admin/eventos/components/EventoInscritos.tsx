
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Evento, CasalEvento } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UserPlus } from "lucide-react";
import AdicionarCasalDialog from "./AdicionarCasalDialog";
import InscritosTable from "./InscritosTable";

interface EventoInscritosProps {
  evento: Evento;
  onBack: () => void;
}

const EventoInscritos = ({ evento, onBack }: EventoInscritosProps) => {
  const { toast } = useToast();
  const [inscritos, setInscritos] = useState<CasalEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [casaisDisponiveis, setCasaisDisponiveis] = useState<any[]>([]);
  const [loadingCasais, setLoadingCasais] = useState(false);
  const [selectedCasal, setSelectedCasal] = useState<number | null>(null);
  const [observacoes, setObservacoes] = useState("");
  const [savingInscricao, setSavingInscricao] = useState(false);

  useEffect(() => {
    fetchInscritos();
    // eslint-disable-next-line
  }, [evento]);

  const fetchInscritos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("casal_evento")
        .select(`
          *,
          inscricoes: id_inscricao (
            codigo_casal,
            pessoas!pessoas_id_inscricao_fkey (
              nome_completo,
              tipo_conjuge,
              sexo
            )
          )
        `)
        .eq("id_evento", evento.id);

      if (error) throw error;

      // Processar os dados para o formato esperado
      const formattedData = data.map((item: any) => {
        const esposo = item.inscricoes.pessoas.find((p: any) => p.sexo === 'M');
        const esposa = item.inscricoes.pessoas.find((p: any) => p.sexo === 'F');

        return {
          ...item,
          casal: {
            codigo_casal: item.inscricoes.codigo_casal,
            esposo: esposo ? { nome_completo: esposo.nome_completo } : null,
            esposa: esposa ? { nome_completo: esposa.nome_completo } : null,
          },
        };
      });

      setInscritos(formattedData);
    } catch (error: any) {
      console.error("Erro ao carregar inscritos:", error);
      toast({
        title: "Erro ao carregar inscritos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCasaisDisponiveis = async () => {
    setLoadingCasais(true);
    try {
      const { data: inscritosData, error: inscritosError } = await supabase
        .from("casal_evento")
        .select("id_inscricao")
        .eq("id_evento", evento.id);

      if (inscritosError) throw inscritosError;

      const idsInscritos = inscritosData.map((item) => item.id_inscricao);

      const { data, error } = await supabase
        .from("inscricoes")
        .select(`
          id_inscricao,
          codigo_casal,
          pessoas!pessoas_id_inscricao_fkey (
            nome_completo,
            tipo_conjuge,
            sexo
          )
        `);

      if (error) throw error;

      const casaisNaoInscritos = data.filter(
        (item) => !idsInscritos.includes(item.id_inscricao)
      );

      const processedData = casaisNaoInscritos.map((item) => {
        const esposo = item.pessoas.find((p: any) => p.sexo === 'M');
        const esposa = item.pessoas.find((p: any) => p.sexo === 'F');
        return {
          id_inscricao: item.id_inscricao,
          codigo_casal: item.codigo_casal,
          esposo: esposo ? esposo.nome_completo : "Não informado",
          esposa: esposa ? esposa.nome_completo : "Não informado",
        };
      });

      setCasaisDisponiveis(processedData);
    } catch (error: any) {
      console.error("Erro ao carregar casais disponíveis:", error);
      toast({
        title: "Erro ao carregar casais",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingCasais(false);
    }
  };

  const openAddDialog = () => {
    fetchCasaisDisponiveis();
    setShowAddDialog(true);
  };

  const handleAddInscricao = async () => {
    if (!selectedCasal) {
      toast({
        title: "Selecione um casal",
        description: "Por favor, selecione um casal para adicionar.",
        variant: "destructive",
      });
      return;
    }

    setSavingInscricao(true);
    try {
      const { error } = await supabase.from("casal_evento").insert({
        id_inscricao: selectedCasal,
        id_evento: evento.id,
        observacoes: observacoes,
      });

      if (error) throw error;

      toast({
        title: "Casal adicionado",
        description: "O casal foi adicionado ao evento com sucesso.",
      });

      setSelectedCasal(null);
      setObservacoes("");
      setShowAddDialog(false);
      fetchInscritos();
    } catch (error: any) {
      console.error("Erro ao adicionar casal:", error);
      toast({
        title: "Erro ao adicionar casal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSavingInscricao(false);
    }
  };

  const handleTogglePresenca = async (id: string, status_inscricao: string | null | undefined) => {
    const novoStatus = status_inscricao === "presente" ? "ausente" : "presente";
    try {
      const { error } = await supabase
        .from("casal_evento")
        .update({ status_inscricao: novoStatus })
        .eq("id", id);

      if (error) throw error;

      setInscritos(
        inscritos.map((inscrito) =>
          inscrito.id === id
            ? { ...inscrito, status_inscricao: novoStatus }
            : inscrito
        )
      );

      toast({
        title: "Presença atualizada",
        description: "A presença do casal foi atualizada com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar presença:", error);
      toast({
        title: "Erro ao atualizar presença",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveInscricao = async (id: string) => {
    try {
      const { error } = await supabase
        .from("casal_evento")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setInscritos(inscritos.filter((inscrito) => inscrito.id !== id));

      toast({
        title: "Inscrição removida",
        description: "A inscrição do casal foi removida com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao remover inscrição:", error);
      toast({
        title: "Erro ao remover inscrição",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filtrar inscritos com base no termo de busca
  const filteredInscritos = inscritos.filter((inscrito) => {
    const nomeEsposo = inscrito.casal?.esposo?.nome_completo?.toLowerCase() || "";
    const nomeEsposa = inscrito.casal?.esposa?.nome_completo?.toLowerCase() || "";
    const codigoCasal = inscrito.casal?.codigo_casal?.toString() || "";
    const searchLower = searchTerm.toLowerCase();

    return (
      nomeEsposo.includes(searchLower) ||
      nomeEsposa.includes(searchLower) ||
      codigoCasal.includes(searchLower)
    );
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">
            Casais Inscritos
          </CardTitle>
          <p className="text-gray-500 mt-1">
            {evento.titulo} - {evento.data_inicio} a {evento.data_fim}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
          <Button onClick={openAddDialog}>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Casal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Buscar por nome ou código do casal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <InscritosTable
          inscritos={filteredInscritos}
          loading={loading}
          onTogglePresenca={handleTogglePresenca}
          onRemove={handleRemoveInscricao}
        />
      </CardContent>
      <AdicionarCasalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        casaisDisponiveis={casaisDisponiveis}
        loadingCasais={loadingCasais}
        selectedCasal={selectedCasal}
        setSelectedCasal={setSelectedCasal}
        observacoes={observacoes}
        setObservacoes={setObservacoes}
        savingInscricao={savingInscricao}
        onAddInscricao={handleAddInscricao}
      />
    </Card>
  );
};

export default EventoInscritos;
