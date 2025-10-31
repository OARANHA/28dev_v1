import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ProblemsSectionProps {
  onOpenModal?: (modalType?: string) => void;
}

export function ProblemsSection({ onOpenModal }: ProblemsSectionProps) {
  const problems = [
    'Investindo em marketing mas não vê resultados claros',
    'Gastando dinheiro em anúncios sem retorno adequado',
    'Não consegue atrair leads qualificados',
    'Estratégias digitais desorganizadas e sem foco'
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Reconhece algum desses problemas?
          </h2>
          <p className="text-xl text-gray-300">
            Você não está sozinho. Milhares de empresas enfrentam os mesmos desafios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start space-x-4 bg-gray-800 p-6 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
              <p className="text-lg">{problem}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onOpenModal?.('Quero resolver esses problemas')}
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all"
          >
            Quero resolver esses problemas
          </button>
        </div>
      </div>
    </section>
  );
}
