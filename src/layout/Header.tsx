
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Calendar, Home, Users, LayoutDashboard, ListCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">
              Encontro de Casais
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>
            
            {user && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary flex items-center gap-1"
              >
                <ListCheck className="h-4 w-4" />
                <span>Inscrições</span>
              </Link>
            )}
            
            {isAdmin && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Painel Admin</span>
                </Link>
                <Link 
                  to="/admin/eventos" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Eventos</span>
                </Link>
              </>
            )}
          </nav>
          
          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center">
            <UserMenu />
            <button 
              className="ml-4 p-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-white dark:bg-gray-900 shadow-lg",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-3 space-y-2">
          <Link 
            to="/"
            className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Início
            </span>
          </Link>
          
          {user && (
            <Link 
              to="/dashboard" 
              className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <ListCheck className="h-4 w-4" />
                Inscrições
              </span>
            </Link>
          )}
          
          {isAdmin && (
            <>
              <Link 
                to="/admin/dashboard" 
                className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Painel Admin
                </span>
              </Link>
              <Link 
                to="/admin/eventos" 
                className="block p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Eventos
                </span>
              </Link>
            </>
          )}
          
          {!user && (
            <div className="p-2">
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => {
                  navigate('/auth');
                  setMobileMenuOpen(false);
                }}
              >
                Login / Cadastro
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
