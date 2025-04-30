
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ECC - Encontro de Casais
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-primary">
            Início
          </Link>
          {user && (
            <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-primary">
              Dashboard
            </Link>
          )}
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
