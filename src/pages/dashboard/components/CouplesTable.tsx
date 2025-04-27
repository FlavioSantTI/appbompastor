
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
  onEdit: (couple: Couple) => void;
  onDelete: (id: number) => void;
}

export default function CouplesTable({ couples, onEdit, onDelete }: CouplesTableProps) {
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
        {couples.map((couple) => (
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
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
