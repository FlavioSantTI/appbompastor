
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Couple } from './types';
import CoupleActions from './CoupleActions';

interface CouplesTableProps {
  couples: Couple[];
  isLoading: boolean; // Adicionado o parâmetro isLoading
  onEdit: (couple: Couple) => void;
  onDelete: (id: number) => void;
  isDeleting?: number | null;
}

export default function CouplesTable({ couples, isLoading, onEdit, onDelete, isDeleting }: CouplesTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>Carregando lista de casais...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Esposa</TableHead>
          <TableHead>Esposo</TableHead>
          <TableHead>Data de Inscrição</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {couples.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              Nenhum casal encontrado
            </TableCell>
          </TableRow>
        ) : (
          couples.map((couple) => (
            <TableRow key={couple.id_inscricao}>
              <TableCell>{couple.codigo_casal}</TableCell>
              <TableCell>{couple.esposa?.nome_completo}</TableCell>
              <TableCell>{couple.esposo?.nome_completo}</TableCell>
              <TableCell>
                {new Date(couple.data_hora_inscricao).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell>
                <CoupleActions
                  onEdit={() => onEdit(couple)}
                  onDelete={() => onDelete(couple.id_inscricao)}
                  isDeleting={isDeleting === couple.id_inscricao}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
