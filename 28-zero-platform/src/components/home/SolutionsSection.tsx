import React from 'react';
import { CheckCircle, Target, TrendingUp, Users } from 'lucide-react';

export function SolutionsSection() {
  const solutions = [
    {
      icon: Target,
      title: 'Estratégia Personalizada',
      description: 'Plano sob medida para seu negócio e objetivos específicos'
    },
    {
      icon: TrendingUp,
      title: 'Resultados Mensuráveis',
      description: 'Acompanhamento em tempo real com métricas claras de ROI'
    },
    {
      icon: Users,
      title: 'Equipe Especializada',
      description: 'Time dedicado de experts em marketing digital'
    },
    {
      icon: CheckCircle,
      title: 'Garantia de Resultados',
      description: 'Se não atingir as metas, devolvemos seu investimento'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            Nossa Solução Completa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Metodologia comprovada que transforma empresas em máquinas de vendas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
