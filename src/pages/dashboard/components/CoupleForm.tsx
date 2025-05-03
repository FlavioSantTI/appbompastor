
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/core/validation';

interface CoupleFormProps {
  open: boolean;
  onClose: () => void;
}

export default function CoupleForm({ open, onClose }: CoupleFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Dados do casal
    codigoCasal: '',
    paroquiaFrequentada: '',
    tempoUniao: '',
    
    // Dados da esposa
    esposa: {
      nomeCompleto: '',
      dataNascimento: '',
      telefone: '',
      email: '',
    },
    
    // Dados do esposo
    esposo: {
      nomeCompleto: '',
      dataNascimento: '',
      telefone: '',
      email: '',
    }
  });

  const handleChange = (field: string, value: string) => {
    const [section, subfield] = field.includes('.') 
      ? field.split('.') 
      : [field, null];

    if (subfield) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as 'esposa' | 'esposo'],
          [subfield]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.codigoCasal || !formData.esposa.nomeCompleto || !formData.esposo.nomeCompleto) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha pelo menos o código do casal e os nomes dos cônjuges.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Inserir a inscrição do casal
      const { data: inscricaoData, error: inscricaoError } = await supabase
        .from('inscricoes')
        .insert({
          codigo_casal: parseInt(formData.codigoCasal),
          paroquia_frequentada: formData.paroquiaFrequentada || null,
          tempo_uniao: formData.tempoUniao ? parseInt(formData.tempoUniao) : null,
          data_hora_inscricao: new Date().toISOString()
        })
        .select();

      if (inscricaoError) throw inscricaoError;
      
      const inscricaoId = inscricaoData[0].id_inscricao;
      
      // 2. Inserir dados da esposa
      const { error: esposaError } = await supabase
        .from('pessoas')
        .insert({
          id_inscricao: inscricaoId,
          nome_completo: formData.esposa.nomeCompleto,
          data_nascimento: formData.esposa.dataNascimento || null,
          telefone: formData.esposa.telefone || null,
          email: formData.esposa.email || null,
          tipo_conjuge: 'esposa',
          sexo: 'F'
        });
      
      if (esposaError) throw esposaError;
      
      // 3. Inserir dados do esposo
      const { error: esposoError } = await supabase
        .from('pessoas')
        .insert({
          id_inscricao: inscricaoId,
          nome_completo: formData.esposo.nomeCompleto,
          data_nascimento: formData.esposo.dataNascimento || null,
          telefone: formData.esposo.telefone || null,
          email: formData.esposo.email || null,
          tipo_conjuge: 'esposo',
          sexo: 'M'
        });
      
      if (esposoError) throw esposoError;
      
      toast({
        title: "Inscrição realizada com sucesso!",
        description: `O casal foi cadastrado com o código ${formData.codigoCasal}.`
      });
      
      // Atualizar a lista de casais
      queryClient.invalidateQueries({ queryKey: ['couples'] });
      
      onClose();
    } catch (error: any) {
      console.error('Erro ao cadastrar casal:', error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Ocorreu um erro ao cadastrar o casal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cadastrar Novo Casal</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <h3 className="col-span-full text-lg font-medium border-b pb-2 mb-2">Dados do Casal</h3>
            
            <div>
              <Label htmlFor="codigoCasal">Código do Casal*</Label>
              <Input 
                id="codigoCasal" 
                value={formData.codigoCasal} 
                onChange={(e) => handleChange('codigoCasal', e.target.value)}
                type="number"
                placeholder="Ex: 123"
                required
              />
            </div>

            <div>
              <Label htmlFor="paroquiaFrequentada">Paróquia</Label>
              <Input 
                id="paroquiaFrequentada" 
                value={formData.paroquiaFrequentada} 
                onChange={(e) => handleChange('paroquiaFrequentada', e.target.value)}
                placeholder="Ex: Nossa Senhora de Fátima"
              />
            </div>

            <div>
              <Label htmlFor="tempoUniao">Tempo de União (anos)</Label>
              <Input 
                id="tempoUniao" 
                value={formData.tempoUniao} 
                onChange={(e) => handleChange('tempoUniao', e.target.value)}
                type="number"
                placeholder="Ex: 5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-medium border-b pb-2 mb-2">Dados da Esposa</h3>
              
              <div>
                <Label htmlFor="esposa.nomeCompleto">Nome Completo*</Label>
                <Input 
                  id="esposa.nomeCompleto" 
                  value={formData.esposa.nomeCompleto} 
                  onChange={(e) => handleChange('esposa.nomeCompleto', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="esposa.dataNascimento">Data de Nascimento</Label>
                <Input 
                  id="esposa.dataNascimento" 
                  value={formData.esposa.dataNascimento} 
                  onChange={(e) => handleChange('esposa.dataNascimento', e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              
              <div>
                <Label htmlFor="esposa.telefone">Telefone</Label>
                <Input 
                  id="esposa.telefone" 
                  value={formData.esposa.telefone} 
                  onChange={(e) => handleChange('esposa.telefone', e.target.value)}
                  placeholder="(99) 99999-9999"
                />
              </div>
              
              <div>
                <Label htmlFor="esposa.email">Email</Label>
                <Input 
                  id="esposa.email" 
                  value={formData.esposa.email} 
                  onChange={(e) => handleChange('esposa.email', e.target.value)}
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
            
            <div className="grid gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg font-medium border-b pb-2 mb-2">Dados do Esposo</h3>
              
              <div>
                <Label htmlFor="esposo.nomeCompleto">Nome Completo*</Label>
                <Input 
                  id="esposo.nomeCompleto" 
                  value={formData.esposo.nomeCompleto} 
                  onChange={(e) => handleChange('esposo.nomeCompleto', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="esposo.dataNascimento">Data de Nascimento</Label>
                <Input 
                  id="esposo.dataNascimento" 
                  value={formData.esposo.dataNascimento} 
                  onChange={(e) => handleChange('esposo.dataNascimento', e.target.value)}
                  placeholder="DD/MM/AAAA"
                />
              </div>
              
              <div>
                <Label htmlFor="esposo.telefone">Telefone</Label>
                <Input 
                  id="esposo.telefone" 
                  value={formData.esposo.telefone} 
                  onChange={(e) => handleChange('esposo.telefone', e.target.value)}
                  placeholder="(99) 99999-9999"
                />
              </div>
              
              <div>
                <Label htmlFor="esposo.email">Email</Label>
                <Input 
                  id="esposo.email" 
                  value={formData.esposo.email} 
                  onChange={(e) => handleChange('esposo.email', e.target.value)}
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Casal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
