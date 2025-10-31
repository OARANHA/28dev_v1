import React from 'react';
import { 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  Crown,
  Target
} from 'lucide-react';

interface PricingPlansProps {
  onSelectPlan?: (planName: string) => void;
}

const PricingSection: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Essencial',
      icon: <Target className="h-8 w-8" />,
      price: 'R$ 2.997',
      period: '/mês',
      description: 'Ideal para empresas que estão começando no digital',
      popular: false,
      features: [
        'Site profissional responsivo',
        'Tráfego pago (Google + Meta)',
        'Relatórios mensais',
        'Suporte por WhatsApp',
        'Otimização SEO básica',
        'Integração com CRM básico'
      ],
      notIncluded: [
        'Automação avançada',
        'Calculadora de ROI',
        'Consultoria estratégica semanal'
      ],
      cta: 'Começar Agora',
      guarantee: '30 dias de garantia'
    },
    {
      name: 'Crescimento',
      icon: <TrendingUp className="h-8 w-8" />,
      price: 'R$ 4.997',
      period: '/mês',
      description: 'Para empresas que querem escalar rapidamente',
      popular: true,
      features: [
        'Tudo do plano Essencial',
        'Automação de marketing completa',
        'Chatbot inteligente',
        'Calculadora de ROI integrada',
        'Relatórios avançados',
        'Consultoria estratégica semanal',
        'Gestão de redes sociais',
        'Email marketing automatizado',
        'Landing pages adicionais'
      ],
      notIncluded: [
        'Desenvolvimento de aplicativo',
        'Análise de concorrentes premium'
      ],
      cta: 'Mais Popular',
      guarantee: '60 dias de garantia'
    },
    {
      name: 'Dominação',
      icon: <Crown className="h-8 w-8" />,
      price: 'R$ 7.997',
      period: '/mês',
      description: 'Solução completa para líderes de mercado',
      popular: false,
      features: [
        'Tudo do plano Crescimento',
        'Desenvolvimento de aplicativo móvel',
        'Sistema personalizado (CRM/ERP)',
        'Análise de concorrentes avançada',
        'Gestor de conta dedicado',
        'Reuniões estratégicas quinzenais',
        'Integração com sistemas legados',
        'Treinamento da equipe',
        'Suporte prioritário 24/7'
      ],
      notIncluded: [],
      cta: 'Solução Premium',
      guarantee: '90 dias de garantia'
    }
  ];

  const additionalServices = [
    {
      name: 'Auditoria SEO Completa',
      price: 'R$ 997',
      description: 'Análise técnica completa + plano de ação'
    },
    {
      name: 'Criação de Conteúdo Premium',
      price: 'R$ 1.497/mês',
      description: '12 posts + 4 vídeos + gestão completa'
    },
    {
      name: 'Treinamento Equipe',
      price: 'R$ 2.997',
      description: 'Workshop intensivo de marketing digital'
    }
  ];

  const faq = [
    {
      question: 'Há algum valor de setup ou taxa de adesão?',
      answer: 'Não! Todos os planos incluem setup gratuito e sem taxa de adesão. Você só paga a mensalidade do plano escolhido.'
    },
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Alterações entrarão em vigor no próximo ciclo de cobrança.'
    },
    {
      question: 'Qual é o tempo mínimo de contrato?',
      answer: 'Recomendamos um contrato mínimo de 6 meses para garantir resultados consistentes, mas oferecemos contratos mensais também.'
    },
    {
      question: 'Como funciona a garantia?',
      answer: 'Se você não ficar satisfeito nos primeiros 30/60/90 dias (dependendo do plano), devolvemos 100% do seu investimento.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-p3zero-black mb-6">
            Investimento que
            <span className="text-primary block">se paga em resultados</span>
          </h2>
          <p className="text-xl text-p3zero-gray max-w-3xl mx-auto leading-relaxed mb-8">
            Nossos clientes têm um ROI médio de <strong className="text-p3zero-black">3.5x</strong> nos primeiros 6 meses. 
            Escolha o plano ideal para o seu momento.
          </p>
          
          {/* ROI Highlight */}
          <div className="inline-flex items-center bg-accent/20 rounded-full px-6 py-3">
            <Star className="h-5 w-5 text-accent mr-2" />
            <span className="text-p3zero-black font-semibold">
              ROI médio: 350% em 6 meses • +10.000 empresas confiando
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary scale-105' 
                  : 'border-neutral-200 hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-p3zero-black mb-2">{plan.name}</h3>
                  <p className="text-p3zero-gray mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-p3zero-black">{plan.price}</span>
                    <span className="text-p3zero-gray ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-p3zero-gray">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3 opacity-50">
                      <div className="h-5 w-5 border-2 border-neutral-300 rounded flex-shrink-0" />
                      <span className="text-p3zero-gray line-through">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Guarantee */}
                <div className="bg-muted p-4 rounded-lg mb-8">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-p3zero-black">{plan.guarantee}</span>
                  </div>
                </div>

                {/* CTA */}
                <button 
                  onClick={() => onSelectPlan?.(plan.name)}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-muted text-card-foreground hover:bg-primary hover:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-p3zero-black mb-4">
              Serviços Adicionais
            </h3>
            <p className="text-lg text-p3zero-gray">
              Potencialize ainda mais seus resultados com nossos serviços complementares
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <h4 className="text-lg font-bold text-p3zero-black mb-2">{service.name}</h4>
                <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                <p className="text-p3zero-gray mb-4">{service.description}</p>
                <button 
                  onClick={() => onSelectPlan?.(service.name)}
                  className="text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  Solicitar orçamento →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Teaser */}
        <div className="bg-gradient-to-r from-p3zero-black to-p3zero-gray text-white p-8 lg:p-12 rounded-2xl mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Calcule seu ROI estimado
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Use nossa calculadora gratuita para descobrir quanto você pode economizar e ganhar com nossa estratégia
            </p>
            <button 
              onClick={() => onSelectPlan?.('Calculadora ROI')}
              className="bg-accent text-p3zero-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors flex items-center space-x-2 mx-auto"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Abrir Calculadora de ROI</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-p3zero-black mb-4">
              Perguntas Frequentes
            </h3>
            <p className="text-lg text-p3zero-gray">
              Esclarecemos as principais dúvidas sobre nossos planos e investimentos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faq.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-bold text-p3zero-black mb-3">{item.question}</h4>
                <p className="text-p3zero-gray">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-primary text-white p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para transformar seu marketing?
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Agende uma conversa gratuita e descubra qual plano é ideal para o seu negócio
            </p>
            <button 
              onClick={() => onSelectPlan?.('Consulta Gratuita')}
              className="bg-card text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-muted transition-colors flex items-center space-x-2 mx-auto"
            >
              <Users className="h-5 w-5" />
              <span>Agendar Consulta Gratuita</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;