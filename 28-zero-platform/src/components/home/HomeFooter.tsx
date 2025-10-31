import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

interface HomeFooterProps {
  onOpenModal?: (modalType?: string) => void;
}

export function HomeFooter({ onOpenModal }: HomeFooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="text-2xl font-bold mb-4">
              28<span className="text-blue-400">ZERO</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transformando empresas através do marketing digital desde 2010.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Marketing Digital</a></li>
              <li><a href="#" className="hover:text-white">Desenvolvimento Web</a></li>
              <li><a href="#" className="hover:text-white">Tráfego Pago</a></li>
              <li><a href="#" className="hover:text-white">CRM & Automação</a></li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-white">Área do Cliente</Link></li>
              <li><a href="#cases" className="hover:text-white">Cases de Sucesso</a></li>
              <li><a href="#precos" className="hover:text-white">Planos e Preços</a></li>
              <li>
                <button onClick={() => onOpenModal?.('Fale Conosco')} className="hover:text-white">
                  Fale Conosco
                </button>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@28zero.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 28 Zero. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
