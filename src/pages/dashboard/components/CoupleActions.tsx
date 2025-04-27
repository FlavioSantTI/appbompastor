
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoupleActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CoupleActions({ onEdit, onDelete }: CoupleActionsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
