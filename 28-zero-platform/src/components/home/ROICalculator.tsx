import React, { useState } from 'react';
import { X, Calculator, TrendingUp } from 'lucide-react';

interface ROICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ROICalculator({ isOpen, onClose }: ROICalculatorProps) {
  const [values, setValues] = useState({
    faturamento: '',
    investimentoAtual: '',
    taxaConversao: ''
  });

  const [results, setResults] = useState<{
    roiAtual: number;
    roiPotencial: number;
    aumentoReceita: number;
  } | null>(null);

  const handleCalculate = () => {
    const faturamento = parseFloat(values.faturamento) || 0;
    const investimento = parseFloat(values.investimentoAtual) || 0;
    const taxa = parseFloat(values.taxaConversao) || 0;

    // Cálculos simplificados
    const roiAtual = investimento > 0 ? ((faturamento - investimento) / investimento) * 100 : 0;
    const roiPotencial = roiAtual * 3.4; // 340% de melhoria média
    const aumentoReceita = (faturamento * 2.4); // Aumento potencial

    setResults({
      roiAtual,
      roiPotencial,
      aumentoReceita
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-3 mb-6">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Calculadora de ROI</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faturamento Mensal (R$)
              </label>
              <input
                type="number"
                value={values.faturamento}
                onChange={(e) => setValues({...values, faturamento: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investimento Atual em Marketing (R$/mês)
              </label>
              <input
                type="number"
                value={values.investimentoAtual}
                onChange={(e) => setValues({...values, investimentoAtual: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa de Conversão Atual (%)
              </label>
              <input
                type="number"
                value={values.taxaConversao}
                onChange={(e) => setValues({...values, taxaConversao: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                placeholder="2.5"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Calcular Potencial
            </button>

            {results && (
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl mt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Seu Potencial</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {results.roiAtual.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600">ROI Atual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {results.roiPotencial.toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600">ROI Potencial</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {results.aumentoReceita.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-600">Receita Potencial</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 text-center">
                  *Baseado em média de crescimento de 340% dos nossos clientes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
