
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CasalDisponivel {
  id_inscricao: number;
  codigo_casal: number;
  esposo: string;
  esposa: string;
}

interface AdicionarCasalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  casaisDisponiveis: CasalDisponivel[];
  loadingCasais: boolean;
  selectedCasal: number | null;
  setSelectedCasal: (id: number | null) => void;
  observacoes: string;
  setObservacoes: (obs: string) => void;
  savingInscricao: boolean;
  onAddInscricao: () => void;
}

export default function AdicionarCasalDialog({
  open,
  onOpenChange,
  casaisDisponiveis,
  loadingCasais,
  selectedCasal,
  setSelectedCasal,
  observacoes,
  setObservacoes,
  savingInscricao,
  onAddInscricao,
}: AdicionarCasalDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Casal ao Evento</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loadingCasais ? (
            <div className="flex justify-center items-center py-8">
              <span className="animate-spin mr-2">⏳</span>
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
                  onClick={() => onOpenChange(false)}
                  disabled={savingInscricao}
                >
                  Cancelar
                </Button>
                <Button onClick={onAddInscricao} disabled={!selectedCasal || savingInscricao}>
                  {savingInscricao ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
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
  );
}
