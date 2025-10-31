import React from 'react';
import { Award, TrendingUp, Users, Shield } from 'lucide-react';

export function CredibilitySection() {
  const stats = [
    {
      icon: Users,
      value: '+10.000',
      label: 'Empresas Atendidas'
    },
    {
      icon: TrendingUp,
      value: '+340%',
      label: 'Crescimento Médio'
    },
    {
      icon: Award,
      value: '15 anos',
      label: 'de Experiência'
    },
    {
      icon: Shield,
      value: '98%',
      label: 'Taxa de Satisfação'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Números que Comprovam Nossa Excelência
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-4 text-orange-400" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
