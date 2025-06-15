import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Evento, CasalEvento } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Check, X, UserPlus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
      // Primeiro, buscamos os IDs dos casais já inscritos neste evento
      const { data: inscritosData, error: inscritosError } = await supabase
        .from("casal_evento")
        .select("id_inscricao")
        .eq("id_evento", evento.id);

      if (inscritosError) throw inscritosError;

      // Lista de IDs já inscritos
      const idsInscritos = inscritosData.map((item) => item.id_inscricao);

      // Agora, buscamos todos os casais que não estão na lista de inscritos
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

      // Filtrar casais que não estão inscritos neste evento
      const casaisNaoInscritos = data.filter(
        (item) => !idsInscritos.includes(item.id_inscricao)
      );

      // Processar os dados para o formato adequado
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

      // Resetar estado e recarregar inscritos
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

  const handleTogglePresenca = async (id: string, status_inscricao: string | null) => {
    // Alternar entre "presente" e "ausente"
    const novoStatus = status_inscricao === "presente" ? "ausente" : "presente";
    try {
      const { error } = await supabase
        .from("casal_evento")
        .update({ status_inscricao: novoStatus })
        .eq("id", id);

      if (error) throw error;

      // Atualizar estado local para refletir a mudança
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

      // Remover do estado local
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
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
            {evento.titulo} - {formatDate(evento.data_inicio)} a{" "}
            {formatDate(evento.data_fim)}
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

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Carregando inscritos...</p>
          </div>
        ) : filteredInscritos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum casal inscrito encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Esposo</TableHead>
                  <TableHead>Esposa</TableHead>
                  <TableHead>Data Inscrição</TableHead>
                  <TableHead>Presente</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInscritos.map((inscrito) => (
                  <TableRow key={inscrito.id}>
                    <TableCell className="font-medium">
                      {inscrito.casal?.codigo_casal || "-"}
                    </TableCell>
                    <TableCell>
                      {inscrito.casal?.esposo?.nome_completo || "Não informado"}
                    </TableCell>
                    <TableCell>
                      {inscrito.casal?.esposa?.nome_completo || "Não informado"}
                    </TableCell>
                    <TableCell>
                      {formatDate(inscrito.data_inscricao)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleTogglePresenca(inscrito.id, inscrito.status_inscricao)
                        }
                        className={
                          inscrito.status_inscricao === "presente"
                            ? "text-green-500"
                            : "text-gray-500"
                        }
                      >
                        {inscrito.status_inscricao === "presente" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <X className="h-5 w-5" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {inscrito.observacoes || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInscricao(inscrito.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Casal ao Evento</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {loadingCasais ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Carregando casais disponíveis...</p>
              </div>
            ) : casaisDisponiveis.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Todos os casais já estão inscritos neste evento.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Esposo</TableHead>
                        <TableHead>Esposa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {casaisDisponiveis.map((casal) => (
                        <TableRow key={casal.id_inscricao}>
                          <TableCell>
                            <Checkbox
                              checked={selectedCasal === casal.id_inscricao}
                              onCheckedChange={() => setSelectedCasal(casal.id_inscricao)}
                            />
                          </TableCell>
                          <TableCell>{casal.codigo_casal}</TableCell>
                          <TableCell>{casal.esposo}</TableCell>
                          <TableCell>{casal.esposa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 space-y-2">
                  <label htmlFor="observacoes" className="block text-sm font-medium">
                    Observações
                  </label>
                  <Textarea
                    id="observacoes"
                    placeholder="Observações sobre a inscrição do casal..."
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDialog(false)}
                    disabled={savingInscricao}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddInscricao} disabled={!selectedCasal || savingInscricao}>
                    {savingInscricao ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adicionando...
                      </>
                    ) : (
                      "Adicionar"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EventoInscritos;
