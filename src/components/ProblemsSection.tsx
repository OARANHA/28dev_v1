import React from 'react';
import { AlertTriangle, TrendingDown, Target, Brain, Settings } from 'lucide-react';

interface ProblemsSectionProps {
  onOpenModal?: (modalType?: string) => void;
}

const ProblemsSection: React.FC<ProblemsSectionProps> = ({ onOpenModal }) => {
  const problems = [
    {
      icon: <Target className="h-8 w-8 text-red-500" />,
      title: 'Leads que não geram resultados',
      description: 'Você atrai visitantes, mas poucos se tornam clientes? A falta de qualificação nos leads gera desperdício de tempo e investimento.'
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-red-500" />,
      title: 'Anúncios sem retorno',
      description: 'Campanhas pagas sem segmentação adequada consomem orçamento e não atraem o público certo, gerando baixo retorno.'
    },
    {
      icon: <Settings className="h-8 w-8 text-red-500" />,
      title: 'Site ultrapassado e sem conversão',
      description: 'Seu site não passa confiança ou não é responsivo? Um visual desatualizado afasta clientes e compromete sua autoridade digital.'
    },
    {
      icon: <Brain className="h-8 w-8 text-red-500" />,
      title: 'Sem direção no digital',
      description: 'Falta uma estratégia clara e personalizada? Sem planejamento, sua presença online se torna inconsistente e pouco eficaz.'
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: 'Processos manuais e sem controle',
      description: 'A ausência de automação e métricas dificulta o acompanhamento do funil de vendas e a tomada de decisões estratégicas.'
    }
  ];

  return (
    <section className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-p3zero-black mb-6">
            Cansado de investir em marketing 
            <span className="text-red-500 block">sem ver retorno?</span>
          </h2>
          <p className="text-xl text-p3zero-gray max-w-3xl mx-auto leading-relaxed">
            Você não está sozinho. Muitos negócios enfrentam desafios como:
          </p>
        </div>

        {/* Grid de Problemas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-p3zero-black mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-p3zero-gray leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Alarmantes */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-p3zero-black mb-4">
              Os números não mentem...
            </h3>
            <p className="text-p3zero-gray">
              Esses são os dados reais de empresas que ainda não resolveram esses problemas:
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">73%</div>
              <div className="text-sm text-p3zero-gray">Perdem dinheiro em anúncios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">89%</div>
              <div className="text-sm text-p3zero-gray">Sites sem conversão</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">67%</div>
              <div className="text-sm text-p3zero-gray">Sem estratégia digital</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">94%</div>
              <div className="text-sm text-p3zero-gray">Processos manuais</div>
            </div>
          </div>
        </div>

        {/* CTA da Seção de Problemas */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              A boa notícia é que isso tem solução!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Na P3ZERO, unimos estratégia, tecnologia e automação para resolver cada um desses problemas.
            </p>
            <button 
              onClick={() => onOpenModal?.('Fale com um especialista')}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-50 transition-colors"
            >
              Fale com um especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;