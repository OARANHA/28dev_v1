import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenModal?: (modalType?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo P3ZERO */}
          <div className="flex items-center">
            <img 
              src="/logo-p3zero.png" 
              alt="P3ZERO" 
              className="h-12 w-auto"
            />
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#solucoes" className="text-muted-foreground hover:text-card-foreground transition-colors font-medium">
              Soluções
            </a>
            <a href="#resultados" className="text-muted-foreground hover:text-card-foreground transition-colors font-medium">
              Resultados
            </a>
            <a href="#sobre" className="text-muted-foreground hover:text-card-foreground transition-colors font-medium">
              Sobre
            </a>
            <a href="#contato" className="text-muted-foreground hover:text-card-foreground transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* CTAs Header */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">(11) 9 9999-9999</span>
            </div>
            <button 
              onClick={() => onOpenModal?.('Fale com um especialista')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Fale com um especialista</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;