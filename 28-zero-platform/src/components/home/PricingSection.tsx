import React from 'react';
import { Check, Zap, Crown } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan?: (plan: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: 'Starter',
      price: '2.500',
      description: 'Ideal para começar',
      features: [
        'Gestão de Redes Sociais',
        'Campanhas Google Ads',
        'Relatórios Mensais',
        'Suporte por Email'
      ],
      icon: Zap,
      popular: false
    },
    {
      name: 'Professional',
      price: '4.500',
      description: 'Mais completo',
      features: [
        'Tudo do Starter',
        'Landing Pages Otimizadas',
        'Email Marketing',
        'CRM Personalizado',
        'Suporte Prioritário'
      ],
      icon: Crown,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sob Consulta',
      description: 'Solução completa',
      features: [
        'Tudo do Professional',
        'Equipe Dedicada',
        'Estratégia Personalizada',
        'Integrações Customizadas',
        'Gestor de Conta Exclusivo'
      ],
      icon: Crown,
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            Planos que Cabem no Seu Bolso
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl p-8 ${
                  plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4">
                    Mais Popular
                  </div>
                )}
                <Icon className={`h-12 w-12 mb-4 ${plan.popular ? 'text-blue-600' : 'text-gray-600'}`} />
                <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">
                    {typeof plan.price === 'string' && plan.price.includes('R$') ? plan.price : `R$ ${plan.price}`}
                  </span>
                  {typeof plan.price !== 'string' || !plan.price.includes('Consulta') ? (
                    <span className="text-gray-600">/mês</span>
                  ) : null}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectPlan?.(plan.name)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Escolher {plan.name}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onSelectPlan?.('Calculadora ROI')}
            className="text-blue-600 font-semibold hover:underline inline-flex items-center"
          >
            <Zap className="h-5 w-5 mr-2" />
            Calcule seu ROI potencial
          </button>
        </div>
      </div>
    </section>
  );
}
