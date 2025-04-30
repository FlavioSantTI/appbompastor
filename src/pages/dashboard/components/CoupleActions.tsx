
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoupleActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function CoupleActions({ onEdit, onDelete, isDeleting = false }: CoupleActionsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
