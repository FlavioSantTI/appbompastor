
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Carregando acesso administrativo...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Acesso Restrito</AlertTitle>
          <AlertDescription className="mt-2">
            <p>Esta área é restrita apenas para administradores do sistema.</p>
            <p className="mt-2">
              Se você precisa de acesso administrativo, entre em contato com o responsável pelo sistema.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default AdminRoute;
