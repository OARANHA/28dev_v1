import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Users, 
  CheckCircle, 
  Star,
  Phone,
  MessageCircle,
  Mail
} from 'lucide-react';

interface CTASectionProps {
  onOpenModal?: (modalType?: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenModal }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    'Diagnóstico gratuito do seu marketing atual',
    'Análise completa da sua presença digital',
    'Estratégia personalizada para seu segmento',
    'Primeira consulta sem compromisso',
    'Acesso direto ao time especializado'
  ];

  const urgencyReasons = [
    'Apenas 5 vagas disponíveis este mês',
    'Consulta inicial gratuita (normalmente R$ 500)',
    'Bônus: Auditoria completa de SEO (valor R$ 800)',
    'Suporte prioritário para novos clientes'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho com Urgência */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span className="text-white font-semibold">
              OFERTA ESPECIAL TERMINA EM:
            </span>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm text-white/80">HORAS</div>
            </div>
            <div className="text-white text-3xl font-bold">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm text-white/80">MIN</div>
            </div>
            <div className="text-white text-3xl font-bold">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm text-white/80">SEG</div>
            </div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Pronto para 10x seus
            <span className="block text-accent">leads qualificados?</span>
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Esta é sua <strong>última chance</strong> de garantir a consulta gratuita + auditoria completa 
            que pode transformar completamente o seu negócio digital.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Oferta Principal */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-p3zero-black mb-4">
                Pacote Completo de Análise Gratuita
              </h3>
              <div className="text-sm text-p3zero-gray mb-6">
                Valor normal: <span className="line-through">R$ 1.300</span>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                GRÁTIS por tempo limitado
              </div>
              <div className="text-sm text-p3zero-gray">
                Economize R$ 1.300 - Apenas hoje!
              </div>
            </div>

            {/* Lista de Benefícios */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-p3zero-gray">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Razões de Urgência */}
            <div className="bg-accent/10 p-6 rounded-xl mb-8">
              <h4 className="font-bold text-p3zero-black mb-4 flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                Por que essa oferta é limitada:
              </h4>
              <div className="space-y-2">
                {urgencyReasons.map((reason, index) => (
                  <div key={index} className="text-sm text-p3zero-gray flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs Principais */}
            <div className="space-y-4">
              <button 
                onClick={() => onOpenModal?.('QUERO MINHA CONSULTA GRATUITA AGORA')}
                className="w-full bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>QUERO MINHA CONSULTA GRATUITA AGORA</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <div className="text-center text-sm text-p3zero-gray">
                Ou escolha outra forma de contato:
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-neutral-100 text-p3zero-gray px-4 py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Ligar</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-neutral-100 text-p3zero-gray px-4 py-3 rounded-lg hover:bg-neutral-200 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>E-mail</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lado Direito - Social Proof */}
          <div className="space-y-8">
            
            {/* Depoimentos Rápidos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 mr-3" />
                <h4 className="text-xl font-bold">Quem já garantiriu:</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold">M</div>
                  <div>
                    <div className="font-semibold">Maria S. - CEO TechStart</div>
                    <div className="text-sm text-white/80">"Resultado incrível em 30 dias!"</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold">J</div>
                  <div>
                    <div className="font-semibold">João P. - Diretor Comercial</div>
                    <div className="text-sm text-white/80">"Melhor investimento que fiz este ano."</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold">A</div>
                  <div>
                    <div className="font-semibold">Ana C. - Fundadora</div>
                    <div className="text-sm text-white/80">"Transformação completa do meu negócio."</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garantias */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-accent" />
                Nossas Garantias:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">100% sem compromisso</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Consulta com especialista sênior</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Análise detalhada e personalizada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Não vendemos, apenas orientamos</span>
                </div>
              </div>
            </div>

            {/* Última Chance */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-400/30">
              <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                <Clock className="h-6 w-6 mr-3" />
                ÚLTIMA CHANCE:
              </h4>
              <p className="text-white/90 text-sm mb-4">
                Esta oferta especial expira quando o countdown chegar a zero. 
                Após isso, volta ao valor normal de R$ 1.300.
              </p>
              <div className="text-center">
                <button 
                  onClick={() => onOpenModal?.('GARANTIR MINHA VAGA AGORA')}
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
                >
                  GARANTIR MINHA VAGA AGORA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer de Urgência */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <Clock className="h-5 w-5 mr-2 text-accent" />
            <span className="text-white font-semibold">
              Apenas 3 vagas restantes para hoje
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;