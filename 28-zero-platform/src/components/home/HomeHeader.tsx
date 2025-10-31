import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeHeaderProps {
  onOpenModal?: (modalType?: string) => void;
}

export function HomeHeader({ onOpenModal }: HomeHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-black">
              28<span className="text-blue-600">ZERO</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Serviços
            </a>
            <a href="#cases" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cases
            </a>
            <a href="#precos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Preços
            </a>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <button
              onClick={() => onOpenModal?.('Fale com um especialista')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Fale Conosco
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#servicos" className="text-gray-700 hover:text-blue-600">
                Serviços
              </a>
              <a href="#cases" className="text-gray-700 hover:text-blue-600">
                Cases
              </a>
              <a href="#precos" className="text-gray-700 hover:text-blue-600">
                Preços
              </a>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <button
                onClick={() => {
                  onOpenModal?.('Fale com um especialista');
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 text-left"
              >
                Fale Conosco
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
