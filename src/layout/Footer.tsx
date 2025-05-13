
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Encontro de Casais</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Fortalecendo relacionamentos através da fé e comunhão com Deus.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:contato@encontrodecasais.com" className="text-gray-500 hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Inscrições
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                  Login / Cadastro
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="text-sm text-gray-600 dark:text-gray-400 not-italic">
              <p className="mb-2">Igreja Bom Pastor</p>
              <p className="mb-2">Nova União, MG</p>
              <p className="mb-2">Tel: (31) 3123-4567</p>
              <p>Email: contato@encontrodecasais.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} Matrimony Flow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
