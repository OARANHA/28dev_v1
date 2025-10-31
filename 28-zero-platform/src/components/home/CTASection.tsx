import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';

interface CTASectionProps {
  onOpenModal?: (modalType?: string) => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Rocket className="h-16 w-16 mx-auto mb-6" />
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">
          Pronto para Transformar Seus Resultados?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Agende uma consulta gratuita e descubra como podemos multiplicar seus resultados em 30 dias
        </p>
        <button
          onClick={() => onOpenModal?.('Quero uma consulta gratuita')}
          className="bg-orange-500 text-white px-10 py-5 rounded-lg font-semibold text-xl hover:bg-orange-600 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
        >
          <span>Agendar Consulta Gratuita</span>
          <ArrowRight className="h-6 w-6" />
        </button>
        <p className="mt-6 text-sm text-blue-200">
          Sem compromisso • Análise personalizada gratuita • Resposta em 24h
        </p>
      </div>
    </section>
  );
}
