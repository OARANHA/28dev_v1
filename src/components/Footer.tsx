import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Linkedin, 
  Instagram,
  Clock,
  Shield,
  Award
} from 'lucide-react';

interface FooterProps {
  onOpenModal?: (modalType?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Sites Profissionais',
    'Aplicativos Mobile',
    'Tráfego Pago',
    'CRM e Automação',
    'Prospecção B2B',
    'Automação Digital'
  ];

  const segments = [
    'Saúde e Bem-estar',
    'Tecnologia e Software',
    'E-commerce e Varejo',
    'Serviços Financeiros',
    'Indústria e Manufatura',
    'Educação e Treinamento'
  ];

  const quickLinks = [
    'Sobre a P3ZERO',
    'Nossos Cases',
    'Blog',
    'Trabalhe Conosco',
    'Política de Privacidade',
    'Termos de Uso'
  ];

  return (
    <footer className="bg-p3zero-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Grid Principal */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          
          {/* Coluna 1 - Empresa */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/logo-p3zero.png" 
                alt="P3ZERO" 
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              A força por trás do crescimento de empresas que querem crescer de verdade. 
              Transformamos desafios digitais em resultados reais.
            </p>

            {/* Localização */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-white/80">
                  Avenida Paulista, 1337 - Bela Vista, São Paulo/SP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-white/80">
                  Segunda a Sexta: 8h às 18h | Urgências: 24/7
                </span>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Serviços */}
          <div>
            <h3 className="text-lg font-bold mb-6">Nossos Serviços</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Segmentos */}
          <div>
            <h3 className="text-lg font-bold mb-6">Segmentos</h3>
            <ul className="space-y-3">
              {segments.map((segment, index) => (
                <li key={index}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    {segment}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-lg font-bold mb-6">Entre em Contato</h3>
            
            <div className="space-y-4 mb-6">
              <a href="tel:+5511999999999" className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">+55 (11) 9 9999-9999</span>
              </a>
              <a href="https://wa.me/5511999999999" className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">WhatsApp Business</span>
              </a>
              <a href="mailto:contato@p3zero.com.br" className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">contato@p3zero.com.br</span>
              </a>
            </div>

            {/* CTA Footer */}
            <div className="bg-primary/20 p-4 rounded-lg border border-primary/30">
              <h4 className="font-bold mb-2">Fale com um especialista</h4>
              <p className="text-sm text-white/80 mb-3">
                Resposta em até 2 horas
              </p>
              <button 
                onClick={() => onOpenModal?.('Fale com um especialista')}
                className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90 transition-colors w-full"
              >
                Iniciiar Conversa
              </button>
            </div>
          </div>
        </div>

        {/* Certificações e Garantias */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-sm">LGPD Compliant</div>
                <div className="text-xs text-white/70">100% em conformidade</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-sm">Certificações</div>
                <div className="text-xs text-white/70">Google & Meta Partners</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-sm">Suporte 24/7</div>
                <div className="text-xs text-white/70">Via WhatsApp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="font-bold mb-4">Links Rápidos</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <a 
                key={index}
                href="#" 
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-bold mb-2">Receba insights exclusivos</h4>
              <p className="text-white/80 text-sm">
                Dicas de marketing digital, cases de sucesso e novidades do mercado direto no seu e-mail.
              </p>
            </div>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Assinar
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} P3ZERO. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-xs text-white/50 text-center leading-relaxed">
            <strong>Aviso:</strong> Os resultados mencionados nos casos de sucesso podem variar de acordo com o segmento, 
            investimento e implementação das estratégias. A P3ZERO não garante resultados específicos, mas sim 
            comprometido com a excelência na execução e transparência nos processos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;