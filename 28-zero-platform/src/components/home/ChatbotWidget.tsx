import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface ChatbotWidgetProps {
  onOpenModal?: (modalType: string) => void;
  onSelectPricing?: (plan: string) => void;
}

export function ChatbotWidget({ onOpenModal, onSelectPricing }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          'Olá! Sou o assistente virtual da 28 Zero. Como posso ajudá-lo hoje?',
          [
            'Quero saber sobre preços',
            'Calcular meu ROI',
            'Falar com um especialista',
            'Ver casos de sucesso'
          ]
        );
      }, 1000);
    }
  }, [isOpen]);

  const saveConversationToSupabase = async (userMessage: string, botResponse: string) => {
    try {
      if (!conversationId) {
        // Criar nova conversa
        const { data, error } = await supabase
          .from('conversations')
          .insert([
            {
              visitor_id: `visitor_${Date.now()}`,
              messages: [
                { role: 'user', content: userMessage, timestamp: new Date().toISOString() },
                { role: 'bot', content: botResponse, timestamp: new Date().toISOString() }
              ],
              lead_captured: false
            }
          ])
          .select()
          .single();

        if (!error && data) {
          setConversationId(data.id);
        }
      } else {
        // Atualizar conversa existente
        const { data: existingConv } = await supabase
          .from('conversations')
          .select('messages')
          .eq('id', conversationId)
          .single();

        if (existingConv) {
          const updatedMessages = [
            ...(existingConv.messages || []),
            { role: 'user', content: userMessage, timestamp: new Date().toISOString() },
            { role: 'bot', content: botResponse, timestamp: new Date().toISOString() }
          ];

          await supabase
            .from('conversations')
            .update({ messages: updatedMessages })
            .eq('id', conversationId);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar conversa:', error);
    }
  };

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    addUserMessage(userText);
    setInputText('');
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);
      const response = handleBotResponse(userText.toLowerCase());
      await saveConversationToSupabase(userText, response.text);
      addBotMessage(response.text, response.options);
    }, 1500);
  };

  const handleOptionClick = async (option: string) => {
    addUserMessage(option);
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);
      const response = handleBotResponse(option.toLowerCase());
      await saveConversationToSupabase(option, response.text);
      addBotMessage(response.text, response.options);
    }, 1500);
  };

  const handleBotResponse = (input: string): { text: string; options?: string[] } => {
    if (input.includes('preço') || input.includes('plano') || input.includes('custo')) {
      return {
        text: 'Temos três planos principais: Starter (R$ 2.500/mês), Professional (R$ 4.500/mês) e Enterprise (sob consulta). Qual se encaixa melhor no seu negócio?',
        options: ['Starter', 'Professional', 'Enterprise', 'Quero falar com especialista']
      };
    }

    if (input.includes('roi') || input.includes('retorno') || input.includes('calcula')) {
      onSelectPricing?.('Calculadora ROI');
      return {
        text: 'Ótimo! Abri nossa calculadora de ROI para você. Preencha os dados e veja seu potencial de crescimento.',
        options: ['Quero falar com especialista', 'Ver casos de sucesso']
      };
    }

    if (input.includes('especialista') || input.includes('contato') || input.includes('falar')) {
      onOpenModal?.('Fale com um especialista');
      return {
        text: 'Perfeito! Abri o formulário para você. Preencha seus dados e nossa equipe entrará em contato em até 24 horas.',
        options: ['Ver preços', 'Casos de sucesso']
      };
    }

    if (input.includes('caso') || input.includes('sucesso') || input.includes('cliente')) {
      return {
        text: 'Nossos clientes alcançaram em média +340% de crescimento! Empresas de diversos segmentos confiam em nosso trabalho. Quer saber mais sobre algum plano específico?',
        options: ['Ver preços', 'Falar com especialista', 'Calcular meu ROI']
      };
    }

    if (input.includes('starter')) {
      return {
        text: 'O plano Starter é perfeito para começar! Inclui Gestão de Redes Sociais, Campanhas Google Ads, Relatórios Mensais e Suporte por Email. Quer conversar com um especialista?',
        options: ['Sim, quero falar', 'Ver outros planos']
      };
    }

    if (input.includes('professional')) {
      return {
        text: 'Excelente escolha! O Professional é nosso plano mais popular. Além de tudo do Starter, inclui Landing Pages, Email Marketing, CRM e Suporte Prioritário. Quer agendar uma demonstração?',
        options: ['Sim, agendar', 'Calcular ROI', 'Ver Enterprise']
      };
    }

    if (input.includes('enterprise')) {
      return {
        text: 'O Enterprise é nossa solução mais completa com equipe dedicada e estratégia 100% personalizada. Cada projeto é único. Quer que um especialista prepare uma proposta para você?',
        options: ['Sim, quero proposta', 'Calcular ROI']
      };
    }

    return {
      text: 'Entendo. Posso ajudar com mais alguma informação?',
      options: [
        'Ver preços',
        'Calcular meu ROI',
        'Falar com especialista',
        'Casos de sucesso'
      ]
    };
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-[60]"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-[60]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8" />
              <div>
                <div className="font-semibold">Assistente 28 Zero</div>
                <div className="text-xs text-blue-200">Online</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <p className="text-sm">{message.text}</p>
                      {!message.isBot && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                    </div>
                  </div>
                </div>
                
                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="text-sm bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
