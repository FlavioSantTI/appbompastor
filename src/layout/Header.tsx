
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { ListCheck } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          Encontro de Casais em Nova União com Bom Pastor
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-primary">
            Início
          </Link>
          {user && isAdmin && (
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-primary"
            >
              <ListCheck className="h-4 w-4" />
              <span>Gerenciamento de Inscrições</span>
            </Link>
          )}
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
