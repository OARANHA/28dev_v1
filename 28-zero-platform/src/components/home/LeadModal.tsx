import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaType?: string;
}

export function LeadModal({ isOpen, onClose, ctaType = 'Fale com um especialista' }: LeadModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    segmento: '',
    faturamento: '',
    objetivos: '',
    mensagem: '',
    urgente: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Salvar lead no Supabase
      const { data, error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.nome,
            email: formData.email,
            phone: formData.telefone,
            metadata: {
              empresa: formData.empresa,
              segmento: formData.segmento,
              faturamento: formData.faturamento,
              objetivos: formData.objetivos,
              mensagem: formData.mensagem,
              urgente: formData.urgente,
              cta_type: ctaType,
              origem: 'landing_page'
            },
            source: 'landing_page',
            status: formData.urgente ? 'new' : 'new'
          }
        ])
        .select();

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      
      // Fechar modal após 3 segundos
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          empresa: '',
          segmento: '',
          faturamento: '',
          objetivos: '',
          mensagem: '',
          urgente: false
        });
      }, 3000);
    } catch (err: any) {
      console.error('Erro ao salvar lead:', err);
      setError('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white p-6 rounded-t-2xl relative">
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
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Informações Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Informações</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(11) 9 9999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Sua empresa"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Negócio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre seu Negócio</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Segmento/Setor *
                      </label>
                      <select
                        name="segmento"
                        value={formData.segmento}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Faturamento Mensal Aproximado
                      </label>
                      <select
                        name="faturamento"
                        value={formData.faturamento}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione a faixa</option>
                        <option value="ate-50k">Até R$ 50.000</option>
                        <option value="50k-200k">R$ 50.000 - R$ 200.000</option>
                        <option value="200k-500k">R$ 200.000 - R$ 500.000</option>
                        <option value="500k-1m">R$ 500.000 - R$ 1.000.000</option>
                        <option value="acima-1m">Acima de R$ 1.000.000</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Objetivos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principais Objetivos *
                  </label>
                  <select
                    name="objetivos"
                    value={formData.objetivos}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione seu objetivo</option>
                    <option value="aumentar-vendas">Aumentar vendas</option>
                    <option value="gerar-leads">Gerar mais leads</option>
                    <option value="aumentar-roi">Melhorar ROI das campanhas</option>
                    <option value="presenca-digital">Fortalecer presença digital</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                {/* Mensagem */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem Adicional
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Conte-nos mais sobre suas necessidades..."
                  />
                </div>

                {/* Urgência */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="urgente"
                    name="urgente"
                    checked={formData.urgente}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="urgente" className="text-sm text-gray-700 cursor-pointer">
                    Preciso de ajuda urgente (resposta em até 2 horas)
                  </label>
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white py-4 rounded-lg font-semibold text-lg hover:from-[#1e3a8a]/90 hover:to-[#3b82f6]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar e Receber Análise Gratuita'}
                </button>

                <p className="text-xs text-center text-gray-500">
                  Ao enviar, você concorda em receber comunicações da 28 Zero
                </p>
              </form>
            </>
          ) : (
            <div className="p-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-green-100 rounded-full p-6">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Recebemos suas informações!
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe entrará em contato em breve com sua análise personalizada.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Fique atento ao e-mail: {formData.email}</p>
                <p>Ou ao telefone: {formData.telefone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
