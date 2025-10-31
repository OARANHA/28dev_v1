import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowRight, 
  X,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

interface ROICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentLeads: 50,
    conversionRate: 2.5,
    averageTicket: 500,
    monthlyInvestment: 3000,
    targetGrowth: 150,
    currentSpentOnMarketing: 5000
  });

  const [results, setResults] = useState({
    currentRevenue: 0,
    projectedLeads: 0,
    projectedRevenue: 0,
    monthlyIncrease: 0,
    roiPercentage: 0,
    breakEven: 0,
    totalGain: 0
  });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isOpen && showResults) {
      calculateROI();
    }
  }, [formData, showResults, isOpen]);

  const calculateROI = () => {
    const {
      currentLeads,
      conversionRate,
      averageTicket,
      monthlyInvestment,
      targetGrowth,
      currentSpentOnMarketing
    } = formData;

    // Cálculos atuais
    const currentConversions = (currentLeads * conversionRate) / 100;
    const currentRevenue = currentConversions * averageTicket;

    // Cálculos projetados com P3ZERO
    const projectedLeads = currentLeads * (1 + targetGrowth / 100);
    const projectedConversions = (projectedLeads * conversionRate) / 100;
    const projectedRevenue = projectedConversions * averageTicket;

    // ROI
    const monthlyIncrease = projectedRevenue - currentRevenue;
    const roiPercentage = ((monthlyIncrease - monthlyInvestment) / monthlyInvestment) * 100;
    const breakEven = Math.ceil(monthlyInvestment / (monthlyIncrease / currentConversions));
    const totalGain = (monthlyIncrease - monthlyInvestment) * 12;

    setResults({
      currentRevenue,
      projectedLeads,
      projectedRevenue,
      monthlyIncrease,
      roiPercentage,
      breakEven,
      totalGain
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const resetCalculator = () => {
    setShowResults(false);
    setResults({
      currentRevenue: 0,
      projectedLeads: 0,
      projectedRevenue: 0,
      monthlyIncrease: 0,
      roiPercentage: 0,
      breakEven: 0,
      totalGain: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-2xl relative">
            <button 
              onClick={() => {
                onClose();
                resetCalculator();
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="pr-12">
              <div className="flex items-center space-x-3 mb-2">
                <Calculator className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Calculadora de ROI</h2>
              </div>
              <p className="text-white/90">
                Descubra quanto você pode ganhar com a estratégia P3ZERO
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-8">
            
            {/* Formulário */}
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-p3zero-black mb-4">Suas Informações Atuais</h3>
                <p className="text-p3zero-gray">
                  Preencha os dados do seu negócio para calcular seu potencial retorno
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Quantos leads você recebe por mês?
                  </label>
                  <input
                    type="number"
                    name="currentLeads"
                    value={formData.currentLeads}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Taxa de conversão atual (%)
                  </label>
                  <input
                    type="number"
                    name="conversionRate"
                    value={formData.conversionRate}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Ticket médio por venda (R$)
                  </label>
                  <input
                    type="number"
                    name="averageTicket"
                    value={formData.averageTicket}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Quanto você gasta atualmente com marketing (R$/mês)?
                  </label>
                  <input
                    type="number"
                    name="currentSpentOnMarketing"
                    value={formData.currentSpentOnMarketing}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Quanto investiria com a P3ZERO? (R$/mês)
                  </label>
                  <select
                    name="monthlyInvestment"
                    value={formData.monthlyInvestment}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyInvestment: parseFloat(e.target.value) || 0 }))}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value={2997}>Essencial - R$ 2.997/mês</option>
                    <option value={4997}>Crescimento - R$ 4.997/mês</option>
                    <option value={7997}>Dominação - R$ 7.997/mês</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-p3zero-gray mb-2">
                    Meta de crescimento (%)
                  </label>
                  <input
                    type="number"
                    name="targetGrowth"
                    value={formData.targetGrowth}
                    onChange={handleInputChange}
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowResults(true)}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Calcular Meu ROI</span>
              </button>
            </div>

            {/* Resultados */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl">
              {showResults ? (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-p3zero-black mb-2">
                      Seu ROI Estimado
                    </h3>
                    <p className="text-p3zero-gray">
                      Resultados projetados com a estratégia P3ZERO
                    </p>
                  </div>

                  {/* Métricas Principais */}
                  <div className="space-y-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-p3zero-gray">Receita Atual</span>
                        <DollarSign className="h-5 w-5 text-p3zero-gray" />
                      </div>
                      <div className="text-3xl font-bold text-p3zero-black">
                        R$ {results.currentRevenue.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-p3zero-gray">por mês</div>
                    </div>

                    <div className="bg-accent/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-p3zero-gray">Receita Projetada</span>
                        <TrendingUp className="h-5 w-5 text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-p3zero-black">
                        R$ {results.projectedRevenue.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-sm text-p3zero-gray">
                        +R$ {results.monthlyIncrease.toLocaleString('pt-BR')} por mês
                      </div>
                    </div>

                    <div className="bg-primary/20 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-p3zero-gray">ROI</span>
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {results.roiPercentage > 0 ? '+' : ''}{results.roiPercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-p3zero-gray">
                        Retorno sobre investimento
                      </div>
                    </div>
                  </div>

                  {/* Detalhes */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                      <span className="text-p3zero-gray">Leads projetados/mês:</span>
                      <span className="font-semibold">{Math.round(results.projectedLeads)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                      <span className="text-p3zero-gray">Break-even:</span>
                      <span className="font-semibold">{results.breakEven} vendas</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                      <span className="text-p3zero-gray">Ganho anual:</span>
                      <span className="font-semibold text-green-600">
                        R$ {results.totalGain.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {/* O que está incluso */}
                  <div className="bg-white p-6 rounded-xl mb-6">
                    <h4 className="font-bold text-p3zero-black mb-4 flex items-center">
                      <Zap className="h-5 w-5 text-accent mr-2" />
                      O que está incluído para alcançar esses resultados:
                    </h4>
                    <div className="space-y-3">
                      {[
                        'Otimização completa do funil de vendas',
                        'Automação de marketing avançada',
                        'Estratégia de tráfego pago otimizada',
                        'A/B testing contínuo',
                        'Relatórios detalhados semanais',
                        'Consultoria estratégica personalizada'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm text-p3zero-gray">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="space-y-4">
                    <button className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                      <span>Quero esses resultados</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    
                    <button 
                      onClick={resetCalculator}
                      className="w-full border border-primary text-primary py-3 px-6 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                      Recalcular
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-p3zero-black mb-2">
                    Preencha os dados ao lado
                  </h3>
                  <p className="text-p3zero-gray">
                    Descubra seu potencial de retorno sobre investimento
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-neutral-50 p-6 rounded-b-2xl">
            <p className="text-xs text-p3zero-gray text-center">
              <strong>Aviso:</strong> Os resultados da calculadora são estimativas baseadas em dados históricos de nossos clientes. 
              Resultados individuais podem variar conforme implementação, segmento de mercado e outros fatores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;