
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import { CasalEvento } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface InscritosTableProps {
  inscritos: CasalEvento[];
  loading: boolean;
  onTogglePresenca: (id: string, status?: string | null) => void;
  onRemove: (id: string) => void;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    return dateString;
  }
};

export default function InscritosTable({
  inscritos,
  loading,
  onTogglePresenca,
  onRemove,
}: InscritosTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="animate-spin mr-2">⏳</span>
        <p>Carregando inscritos...</p>
      </div>
    );
  }

  if (inscritos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum casal inscrito encontrado.</p>
      </div>
    );
  }

  return (
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
          {inscritos.map((inscrito) => (
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
                    onTogglePresenca(inscrito.id, inscrito.status_inscricao)
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
                  onClick={() => onRemove(inscrito.id)}
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
  );
}
