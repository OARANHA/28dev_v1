import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaType?: string;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, ctaType = 'Fale com um especialista' }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    segmento: '',
    mensam: '',
    objetivos: '',
    urgente: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria enviado para backend/CRM
    console.log('Lead capturado:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        segmento: '',
        mensam: '',
        objetivos: '',
        urgente: false
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-2xl relative">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="pr-12">
                  <h2 className="text-2xl font-bold mb-2">{ctaType}</h2>
                  <p className="text-white/90">
                    Responda algumas perguntas e receba uma análise gratuita do seu marketing digital
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Informações Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-p3zero-black mb-4">Suas Informações</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="(11) 9 9999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Sua empresa"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Negócio */}
                <div>
                  <h3 className="text-lg font-semibold text-p3zero-black mb-4">Sobre seu Negócio</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        Segmento/Setor *
                      </label>
                      <select
                        name="segmento"
                        value={formData.segmento}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Selecione o segmento</option>
                        <option value="saude">Saúde e Bem-estar</option>
                        <option value="tecnologia">Tecnologia e Software</option>
                        <option value="ecommerce">E-commerce e Varejo</option>
                        <option value="financeiro">Serviços Financeiros</option>
                        <option value="industrial">Indústria e Manufatura</option>
                        <option value="educacao">Educação e Treinamento</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-p3zero-gray mb-2">
                        Faturamento Mensal Aproximado
                      </label>
                      <select
                        name="mensam"
                        value={formData.mensam}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Selecione a faixa</option>
                        <option value="ate-50k">Até R$ 50.000</option>
                        <option value="50k-200k">R$ 50.000 - R$ 200.000</option>
                        <option value="200k-500k">R$ 200.000 - R$ 500.000</option>
                        <option value="500k-1m">R$ 500.000 - R$ 1.000.000</option>
                        <option value="mais-1m">Mais de R$ 1.000.000</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-p3zero-gray mb-2">
                      Quais são seus principais objetivos? *
                    </label>
                    <textarea
                      name="objetivos"
                      value={formData.objetivos}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: Aumentar leads qualificados, melhorar conversão do site, automatizar processo de vendas..."
                    />
                  </div>
                </div>

                {/* Urgência */}
                <div className="bg-accent/10 p-4 rounded-lg">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="urgente"
                      checked={formData.urgente}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-p3zero-black">
                        Preciso de uma solução URGENTE
                      </span>
                      <p className="text-xs text-p3zero-gray">
                        Attendemos clientes com urgência em até 24h
                      </p>
                    </div>
                  </label>
                </div>

                {/* Benefícios */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-p3zero-black mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    O que você receberá GRATUITAMENTE:
                  </h4>
                  <ul className="space-y-2 text-sm text-p3zero-gray">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      Diagnóstico completo do seu marketing atual
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      Análise de oportunidades de melhoria
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      Estratégia personalizada para seu segmento
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                      Consulta de 1h com nosso especialista
                    </li>
                  </ul>
                </div>

                {/* Submit */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Receber minha análise GRATUITA</span>
                  </button>
                  
                  <div className="text-center text-sm text-p3zero-gray">
                    <p>100% sem compromisso • Resposta em até 2 horas</p>
                  </div>
                </div>

                {/* Contato alternativo */}
                <div className="border-t pt-4">
                  <p className="text-center text-sm text-p3zero-gray mb-4">
                    Prefere falar direto? Entre em contato:
                  </p>
                  <div className="flex justify-center space-x-6">
                    <a href="tel:+5511999999999" className="flex items-center space-x-2 text-primary">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">(11) 9 9999-9999</span>
                    </a>
                    <a href="mailto:contato@p3zero.com.br" className="flex items-center space-x-2 text-primary">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">contato@p3zero.com.br</span>
                    </a>
                  </div>
                </div>
              </form>
            </>
          ) : (
            // Success State
            <div className="p-8 text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-p3zero-black mb-4">
                Obrigado! Sua análise está sendo preparada
              </h3>
              <p className="text-p3zero-gray mb-6">
                Recebemos suas informações e nossa equipe entrará em contato em até 2 horas 
                para agendar sua análise gratuita.
              </p>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-sm text-p3zero-gray">
                  <strong>Próximos passos:</strong><br />
                  1. Nossa equipe analisará suas informações<br />
                  2. Prepararemos um diagnóstico personalizado<br />
                  3. Entraremos em contato para agendar a consulta
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;