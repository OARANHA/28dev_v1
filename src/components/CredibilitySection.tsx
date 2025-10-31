import React from 'react';
import { 
  MapPin, 
  Award, 
  Shield, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Linkedin,
  Instagram
} from 'lucide-react';

const CredibilitySection = () => {
  const credentials = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Localização Premium',
      description: 'Avenida Paulista, 1337 - São Paulo/SP',
      detail: 'No coração financeiro do Brasil'
    },
    {
      icon: <Award className="h-8 w-8 text-secondary" />,
      title: 'Certificações',
      description: 'Google Partner, Meta Business, HubSpot',
      detail: 'Padrões internacionais de excelência'
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: 'Equipe Especializada',
      description: '15+ profissionais certificados',
      detail: 'Expertise comprovada em marketing digital'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'LGPD Compliant',
      description: '100% em conformidade com a LGPD',
      detail: 'Proteção total dos dados dos seus clientes'
    }
  ];

  const partnerships = [
    'Google Partner Premier',
    'Meta Business Partner',
    'HubSpot Diamond Partner',
    'Adobe Solution Partner',
    'Salesforce Consulting Partner',
    'Microsoft Azure Partner'
  ];

  const teamStats = [
    { label: 'Anos de experiência', value: '8+', icon: <Clock className="h-6 w-6" /> },
    { label: 'Projetos entregues', value: '500+', icon: <CheckCircle className="h-6 w-6" /> },
    { label: 'Clientes ativos', value: '150+', icon: <Users className="h-6 w-6" /> },
    { label: 'Taxa de satisfação', value: '98%', icon: <Star className="h-6 w-6" /> }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: 'Telefone',
      value: '+55 (11) 9 9999-9999',
      action: 'Ligar agora'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      label: 'WhatsApp',
      value: '+55 (11) 9 9999-9999',
      action: 'Conversar no WhatsApp'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: 'E-mail',
      value: 'contato@p3zero.com.br',
      action: 'Enviar e-mail'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-p3zero-black mb-6">
            A força por trás do
            <span className="text-primary block">seu sucesso digital</span>
          </h2>
          <p className="text-xl text-p3zero-gray max-w-3xl mx-auto leading-relaxed">
            Mais que uma agência, somos seu parceiro estratégico com credibilidade, 
            experiência e resultados comprovados no mercado.
          </p>
        </div>

        {/* Credenciais Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {credentials.map((credential, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-neutral-50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-neutral-100"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                {credential.icon}
              </div>
              <h3 className="text-xl font-bold text-p3zero-black mb-2">
                {credential.title}
              </h3>
              <p className="text-p3zero-gray font-semibold mb-2">
                {credential.description}
              </p>
              <p className="text-sm text-p3zero-gray">
                {credential.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Localização e Escritório */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-p3zero-black mb-6">
              Escritório Premium na Avenida Paulista
            </h3>
            <p className="text-lg text-p3zero-gray mb-8 leading-relaxed">
              Localizados no coração financeiro de São Paulo, nossa localização estratégica 
              nos permite estar sempre próximos aos principais tomadores de decisão e 
              acompanhar as tendências do mercado em tempo real.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-p3zero-gray">
                  <strong className="text-p3zero-black">Endereço:</strong> Avenida Paulista, 1337 - Bela Vista, São Paulo/SP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-p3zero-gray">
                  <strong className="text-p3zero-black">Atendimento:</strong> Segunda a Sexta, 8h às 18h
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="text-p3zero-gray">
                  <strong className="text-p3zero-black">Urgências:</strong> Suporte 24/7 via WhatsApp
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="/images/modern_professional_office_workspace_interior.jpg" 
              alt="Escritório P3ZERO na Avenida Paulista"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-p3zero-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Estatísticas da Equipe */}
        <div className="bg-gradient-to-r from-p3zero-black to-p3zero-gray text-white p-8 lg:p-12 rounded-2xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Nossa equipe em números
            </h3>
            <p className="text-xl opacity-90">
              Profissionais dedicados exclusivamente ao seu sucesso
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Parcerias e Certificações */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-p3zero-black mb-8">
            Parceiros e Certificações Reconhecidos
          </h3>
          <p className="text-lg text-p3zero-gray mb-12 max-w-2xl mx-auto">
            Trabalhamos com as principais plataformas do mercado, garantindo 
            acesso às melhores ferramentas e tecnologias disponíveis.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerships.map((partnership, index) => (
              <div 
                key={index}
                className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 hover:border-primary/30 transition-colors"
              >
                <div className="text-sm font-semibold text-p3zero-gray text-center">
                  {partnership}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formas de Contato */}
        <div className="bg-neutral-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-p3zero-black mb-4">
              Múltiplas formas de entrar em contato
            </h3>
            <p className="text-lg text-p3zero-gray">
              Escolha a forma mais confortável para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {method.icon}
                </div>
                <h4 className="font-bold text-p3zero-black mb-2">{method.label}</h4>
                <p className="text-p3zero-gray mb-4">{method.value}</p>
                <button className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Redes Sociais */}
          <div className="text-center">
            <h4 className="text-xl font-bold text-p3zero-black mb-6">
              Siga-nos nas redes sociais
            </h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;