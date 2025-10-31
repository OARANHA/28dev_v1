import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Calculator,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  cta?: {
    text: string;
    action: string;
  };
}

interface ChatbotProps {
  onOpenModal?: (modalType: string) => void;
  onSelectPricing?: (plan: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onOpenModal, onSelectPricing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem de boas-vindas
      setTimeout(() => {
        addBotMessage(
          'Olá! 👋 Sou o assistente virtual da P3ZERO. Como posso ajudá-lo hoje?',
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

  const addBotMessage = (text: string, options?: string[], cta?: { text: string; action: string }) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      options,
      cta
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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addUserMessage(inputText);
    setInputText('');
    setIsTyping(true);

    // Simular resposta do bot
    setTimeout(() => {
      setIsTyping(false);
      handleBotResponse(inputText.toLowerCase());
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      handleBotResponse(option.toLowerCase());
    }, 1000);
  };

  const handleBotResponse = (userInput: string) => {
    let response = '';
    let options: string[] = [];
    let cta: { text: string; action: string } | undefined;

    if (userInput.includes('preço') || userInput.includes('custo') || userInput.includes('investimento')) {
      response = 'Nossos planos começam a partir de R$ 2.997/mês. Oferecemos 3 opções:';
      options = ['Ver planos Essencial', 'Ver planos Crescimento', 'Ver planos Dominação'];
      cta = { text: 'Solicitar Orçamento Personalizado', action: 'open-modal' };
    } else if (userInput.includes('roi') || userInput.includes('retorno') || userInput.includes('calcul')) {
      response = 'Nossa calculadora de ROI pode te ajudar a visualizar os resultados! Nossos clientes têm média de 350% de ROI em 6 meses.';
      options = ['Abrir calculadora de ROI', 'Ver cases de ROI', 'Falar com especialista'];
      cta = { text: 'Calcular Meu ROI Agora', action: 'open-calculator' };
    } else if (userInput.includes('caso') || userInput.includes('resultado') || userInput.includes('sucesso')) {
      response = ' Temos cases incríveis! Por exemplo, a TechStart aumentou 340% os leads em 3 meses, e a Inovação Digital triplicou as vendas. Quer ver mais?';
      options = ['Ver casos detalhados', 'Saber como conseguimos', 'Falar com especialista'];
      cta = { text: 'Ver Mais Cases', action: 'view-cases' };
    } else if (userInput.includes('especialista') || userInput.includes('conversar') || userInput.includes('falar')) {
      response = 'Perfeito! Um de nossos especialistas pode te ajudar. Que tal agendarmos uma conversa gratuita?';
      options = ['Agendar conversa agora', 'Ligar agora', 'Mandar WhatsApp'];
      cta = { text: 'Agendar Consulta Gratuita', action: 'open-modal' };
    } else if (userInput.includes('serviço') || userInput.includes('faz') || userInput.includes('oferece')) {
      response = 'Somos especialistas em marketing digital completo! Fazemos: tráfego pago, sites profissionais, automação, aplicativos móveis e muito mais.';
      options = ['Ver todos os serviços', 'Tráfego pago', 'Sites profissionais'];
    } else if (userInput.includes('essencial') || userInput.includes('2997')) {
      response = 'O plano Essencial (R$ 2.997/mês) é ideal para empresas que estão começando no digital. Inclui site profissional, tráfego pago e relatórios mensais.';
      options = ['Conhecer outros planos', 'Calcular ROI', 'Falar com especialista'];
    } else if (userInput.includes('crescimento') || userInput.includes('4997')) {
      response = 'O plano Crescimento (R$ 4.997/mês) é nossa opção mais popular! Inclui automação completa, chatbot, calculadora de ROI e consultoria estratégica semanal.';
      options = ['Por que é popular?', 'Comparar planos', 'Falar com especialista'];
    } else if (userInput.includes('dominação') || userInput.includes('7997')) {
      response = 'O plano Dominação (R$ 7.997/mês) é para quem quer dominar o mercado! Inclui tudo + aplicativo móvel, sistema personalizado e gestor dedicado.';
      options = ['Saber mais detalhes', 'Comparar com Crescimento', 'Falar com especialista'];
    } else {
      response = 'Interessante! Para te ajudar melhor, que tal escolher uma das opções abaixo?';
      options = [
        'Quero saber sobre preços',
        'Calcular meu ROI',
        'Falar com um especialista',
        'Ver casos de sucesso'
      ];
    }

    addBotMessage(response, options, cta);
  };

  const handleCTAClick = (action: string) => {
    if (action === 'open-modal') {
      onOpenModal?.('Fale com um especialista');
      setIsOpen(false);
    } else if (action === 'open-calculator') {
      // Abrir calculadora (implementar depois)
      addBotMessage('A calculadora será aberta em um momento...');
    }
  };

  const quickActions = [
    { text: '💰 Ver Preços', action: () => handleOptionClick('Quero saber sobre preços') },
    { text: '📊 Calcular ROI', action: () => handleOptionClick('Calcular meu ROI') },
    { text: '🎯 Falar Especialista', action: () => handleOptionClick('Falar com um especialista') },
    { text: '📈 Ver Cases', action: () => handleOptionClick('Ver casos de sucesso') }
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-300 ${
          isOpen ? 'rotate-180' : 'hover:scale-110'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-96 h-[600px] bg-card rounded-2xl shadow-2xl border border-border flex flex-col">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Assistente P3ZERO</h3>
                <p className="text-sm text-white/80">Online agora</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] ${message.isBot ? 'bg-muted' : 'bg-primary text-white'} rounded-2xl p-3`}>
                  <div className="flex items-start space-x-2">
                    {message.isBot && <Bot className="h-4 w-4 text-primary mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm ${message.isBot ? 'text-p3zero-black' : 'text-white'}`}>
                        {message.text}
                      </p>
                      
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left text-xs bg-card text-primary border border-primary rounded-lg px-3 py-2 hover:bg-primary hover:text-white transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {message.cta && (
                        <button
                          onClick={() => handleCTAClick(message.cta.action)}
                          className="mt-3 w-full bg-accent text-p3zero-black text-xs font-semibold rounded-lg px-4 py-2 hover:bg-accent/90 transition-colors flex items-center justify-center space-x-1"
                        >
                          <Zap className="h-3 w-3" />
                          <span>{message.cta.text}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-neutral-200 p-3">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="text-xs bg-muted text-muted-foreground rounded-lg px-2 py-2 hover:bg-primary hover:text-white transition-colors"
                >
                  {action.text}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-muted px-4 py-2 rounded-b-2xl">
            <div className="flex items-center justify-center space-x-4 text-xs text-p3zero-gray">
              <a href="tel:+5511999999999" className="flex items-center space-x-1 hover:text-primary">
                <Phone className="h-3 w-3" />
                <span>Ligar</span>
              </a>
              <a href="mailto:contato@p3zero.com.br" className="flex items-center space-x-1 hover:text-primary">
                <Mail className="h-3 w-3" />
                <span>Email</span>
              </a>
              <button 
                onClick={() => onOpenModal?.('Fale com um especialista')}
                className="flex items-center space-x-1 hover:text-primary"
              >
                <MessageCircle className="h-3 w-3" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;