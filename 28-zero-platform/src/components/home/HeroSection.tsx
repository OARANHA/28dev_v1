import React from 'react';
import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal?: (modalType?: string) => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const services = [
    {
      title: 'Sites Profissionais',
      description: 'Criação de sites modernos e otimizados para conversão',
      icon: 'computer'
    },
    {
      title: 'Aplicativos Mobile',
      description: 'Apps personalizados com performance superior',
      icon: 'smartphone'
    },
    {
      title: 'Tráfego Pago',
      description: 'Campanhas estratégicas para resultados reais',
      icon: 'chart'
    },
    {
      title: 'CRM e Automação',
      description: 'Sistemas inteligentes de relacionamento',
      icon: 'users'
    },
    {
      title: 'Prospecção B2B',
      description: 'Leads qualificados para seu time comercial',
      icon: 'target'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            
            {/* Headline Principal */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
                Transforme seu 
                <span className="text-blue-600 block">marketing digital</span>
                em resultados reais
                <span className="text-orange-500 block">em 30 dias</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Cansado de investir em marketing sem ver retorno? 
                <strong className="text-black"> A força por trás do crescimento</strong> de empresas que querem crescer de verdade.
              </p>
            </div>

            {/* Lista de Benefícios */}
            <div className="space-y-3">
              {[
                'Resultados garantidos ou devolvemos seu investimento',
                'Equipe especializada com cases comprovados',
                'Métricas transparentes e relatórios detalhados'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onOpenModal?.('Fale com um especialista AGORA')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Fale com um especialista AGORA</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onOpenModal?.('Descubra o que está travando seu crescimento')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Descubra o que está travando seu crescimento
              </button>
            </div>

            {/* Urgência/Social Proof */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-gray-600">Últimas 24 horas - Oferta especial</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong className="text-black">+10.000 empresas</strong> que já transformaram seus resultados
              </div>
            </div>
          </div>

          {/* Visual/Hero Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src="/images/diverse_business_professionals_high_fiving_success.jpg" 
                alt="Equipe celebrando resultados"
                className="rounded-2xl shadow-2xl w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop';
                }}
              />
              
              {/* Estatísticas Flutuantes */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">+340%</div>
                  <div className="text-sm text-gray-600">Crescimento médio</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">24h</div>
                  <div className="text-sm text-gray-600">Resposta garantida</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Serviços Hero */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="text-4xl mb-3">
                {service.icon === 'computer' && '💻'}
                {service.icon === 'smartphone' && '📱'}
                {service.icon === 'chart' && '📊'}
                {service.icon === 'users' && '🤝'}
                {service.icon === 'target' && '🎯'}
              </div>
              <h3 className="font-semibold text-black mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
