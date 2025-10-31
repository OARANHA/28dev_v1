import React from 'react';
import { 
  Globe, 
  Smartphone, 
  BarChart3, 
  Users, 
  Zap, 
  Shield,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const SolutionsSection = () => {
  const solutions = [
    {
      icon: <Globe className="h-12 w-12 text-blue-500" />,
      title: 'Sites Profissionais',
      description: 'Criação de sites institucionais modernos, responsivos e otimizados para conversão real.',
      benefits: [
        'Design moderno que gera confiança',
        '100% responsivo e otimizado',
        'Velocidade de carregamento superior',
        'SEO técnico avançado'
      ],
      result: '+250% em conversões'
    },
    {
      icon: <Smartphone className="h-12 w-12 text-green-500" />,
      title: 'Aplicativos Mobile',
      description: 'Desenvolvimento de apps personalizados para Android e iOS, com foco em performance e escalabilidade.',
      benefits: [
        'Interface intuitiva e moderna',
        'Performance nativa superior',
        'Segurança e proteção de dados',
        'Integração com sistemas existentes'
      ],
      result: '+180% em engajamento'
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-orange-500" />,
      title: 'Tráfego Pago',
      description: 'Campanhas estratégicas no Google, Meta e outras plataformas para atrair e converter mais clientes.',
      benefits: [
        'Segmentação inteligente',
        'Otimização contínua',
        'ROI comprovado',
        'Relatórios transparentes'
      ],
      result: '+340% em leads qualificados'
    },
    {
      icon: <Users className="h-12 w-12 text-purple-500" />,
      title: 'CRM e Relacionamento',
      description: 'Implementação e gestão de CRM para automatizar o funil de vendas e melhorar o relacionamento.',
      benefits: [
        'Automação de processos',
        'Lead scoring inteligente',
        'Integração multicanal',
        'Análise preditiva'
      ],
      result: '+90% em vendas'
    },
    {
      icon: <Target className="h-12 w-12 text-red-500" />,
      title: 'Prospecção B2B',
      description: 'Captação ativa de novos leads qualificados para seu time comercial com estratégias inteligentes.',
      benefits: [
        'Base de dados qualificada',
        'Script de vendas otimizado',
        'Follow-up automatizado',
        'Métricas de performance'
      ],
      result: '+200% em oportunidades'
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: 'Automação Digital',
      description: 'Soluções completas de automação para acelerar processos e aumentar a eficiência operacional.',
      benefits: [
        'Chatbots inteligentes',
        'Email marketing avançado',
        'Workflows customizados',
        'Integração de sistemas'
      ],
      result: '+150% em produtividade'
    }
  ];

  return (
    <section id="solucoes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-p3zero-black mb-6">
            Soluções que
            <span className="text-primary block">impulsionam resultados reais</span>
          </h2>
          <p className="text-xl text-p3zero-gray max-w-3xl mx-auto leading-relaxed">
            Na P3ZERO, unimos estratégia, tecnologia e automação para entregar 
            <strong className="text-p3zero-black"> soluções personalizadas para cada segmento</strong> 
            que realmente transformam negócios.
          </p>
        </div>

        {/* Grid de Soluções */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="bg-neutral-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-neutral-200 group"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  {solution.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-p3zero-black">
                      {solution.title}
                    </h3>
                    <div className="bg-accent/20 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-accent">
                        {solution.result}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-p3zero-gray mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {solution.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-p3zero-gray">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center space-x-2 group-hover:translate-x-1 transform transition-transform">
                    <span>Saiba mais</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Diferenciais P3ZERO */}
        <div className="bg-gradient-to-r from-p3zero-black to-p3zero-gray text-white p-8 lg:p-12 rounded-2xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Por que escolher a P3ZERO?
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Não somos apenas mais uma agência. Somos seu parceiro estratégico no crescimento digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-3">Resultados Garantidos</h4>
              <p className="opacity-80">
                Garantimos campanhas de alta performance e presença digital sólida, ou devolvemos seu investimento.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-3">Crescimento Sustentável</h4>
              <p className="opacity-80">
                Estratégias focadas em performance, usabilidade e escalabilidade para crescimento de longo prazo.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-bold mb-3">Execução com Excelência</h4>
              <p className="opacity-80">
                Otimizados para conversão real, automação eficiente e execução com excelência em cada projeto.
              </p>
            </div>
          </div>
        </div>

        {/* CTA da Seção de Soluções */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-p3zero-black mb-6">
            Pronto para ver resultados como estes no seu negócio?
          </h3>
          <p className="text-xl text-p3zero-gray mb-8 max-w-2xl mx-auto">
            Fale com quem entende do seu negócio e descubra como podemos transformar seus desafios em oportunidades.
          </p>
          <button className="bg-primary text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <span>Veja todas as nossas soluções</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;