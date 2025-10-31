import React from 'react';
import { 
  Star, 
  Quote, 
  Users, 
  TrendingUp, 
  Award,
  Building,
  Heart,
  Target,
  ArrowRight
} from 'lucide-react';

const SocialProofSection = () => {
  const testimonials = [
    {
      name: 'Maria Silva',
      position: 'CEO',
      company: 'TechStart Soluções',
      image: '/images/diverse_collaborative_business_team_social_proof.jpg',
      quote: 'A P3ZERO transformou completamente nossa presença digital. Em 3 meses aumentamos nossos leads em 340% e triplicamos我们的 vendas. Incrível!',
      rating: 5,
      results: '+340% leads, +200% vendas'
    },
    {
      name: 'João Santos',
      position: 'Diretor Comercial',
      company: 'Inovação Digital',
      image: '/images/diverse_team_collaboration_business_meeting.jpg',
      quote: 'Profissionalismo excepcional. O time da P3ZERO não apenas entregou o que prometeram, mas superaram nossas expectativas em todos os aspectos.',
      rating: 5,
      results: '+250% conversões, +150% ROI'
    },
    {
      name: 'Ana Costa',
      position: 'Fundadora',
      company: 'E-commerce Plus',
      image: '/images/diverse_team_collaboration_high_five_office_success.jpg',
      quote: 'Finalmente encontrei uma agência que entende realmente de resultados. Nossa automação de vendas agora funciona 24/7 sem intervenção manual.',
      rating: 5,
      results: '+400% automação, +180% eficiência'
    }
  ];

  const caseStudies = [
    {
      title: 'Plataforma EAD Médica',
      description: 'Desenvolvimento de plataforma completa com área exclusiva para alunos, oferecendo experiência de ensino digital intuitiva e resultados mensuráveis.',
      image: '/images/digital_marketing_technology_icons_illustration.jpg',
      metrics: [
        { label: 'Alunos ativos', value: '2.500+', growth: '+150%' },
        { label: 'Taxa de conclusão', value: '89%', growth: '+67%' },
        { label: 'Satisfação', value: '4.9/5', growth: '+45%' }
      ]
    },
    {
      title: 'App de Gestão da Saúde',
      description: 'Conectando pacientes e clínicas com agilidade e segurança, revolucionando o atendimento médico através da tecnologia.',
      image: '/images/digital_marketing_experiences_technology_infographic.jpg',
      metrics: [
        { label: 'Usuários cadastrados', value: '15.000+', growth: '+280%' },
        { label: 'Consultas agendadas', value: '8.500+', growth: '+320%' },
        { label: 'Tempo de resposta', value: '< 2min', growth: '-70%' }
      ]
    },
    {
      title: 'Estratégia Digital 360°',
      description: 'Implementação completa incluindo redes sociais, tráfego pago e presença online sólida para empresa do setor industrial.',
      image: '/images/business_growth_upward_bar_chart.png',
      metrics: [
        { label: 'Leads qualificados', value: '450/mês', growth: '+340%' },
        { label: 'Custo por lead', value: 'R$ 15', growth: '-60%' },
        { label: 'Conversão', value: '12.5%', growth: '+180%' }
      ]
    }
  ];

  const companyLogos = [
    'TechStart', 'Inovação Digital', 'E-commerce Plus', 'MedTech', 'HealthCare', 
    'FinTech', 'EduTech', 'AgroTech', 'RetailTech', 'LogiTech'
  ];

  return (
    <section id="resultados" className="py-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-p3zero-black mb-6">
            Projetos que 
            <span className="text-primary block">entregam resultados de verdade</span>
          </h2>
          <p className="text-xl text-p3zero-gray max-w-3xl mx-auto leading-relaxed">
            Veja como transformamos negócios como o seu e大家一起创造成功案例
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-p3zero-black">{testimonial.name}</h4>
                  <p className="text-sm text-p3zero-gray">{testimonial.position}</p>
                  <p className="text-sm text-primary font-semibold">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-p3zero-gray mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-p3zero-black">Resultados:</span>
                  <span className="text-sm font-bold text-accent">{testimonial.results}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-p3zero-black mb-4">
              Cases de Sucesso
            </h3>
            <p className="text-xl text-p3zero-gray">
              Projetos que demonstram nossa capacidade de entregar excelência
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-p3zero-black mb-3">
                    {caseStudy.title}
                  </h4>
                  <p className="text-p3zero-gray mb-6 leading-relaxed">
                    {caseStudy.description}
                  </p>
                  
                  <div className="space-y-3">
                    {caseStudy.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center justify-between">
                        <span className="text-sm text-p3zero-gray">{metric.label}</span>
                        <div className="text-right">
                          <div className="font-bold text-p3zero-black">{metric.value}</div>
                          <div className="text-xs text-accent">{metric.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas de Impacto */}
        <div className="bg-gradient-to-r from-p3zero-black to-p3zero-gray text-white p-8 lg:p-12 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Nossos números falam por si
            </h3>
            <p className="text-xl opacity-90">
              Métricas que demonstram o impacto real da P3ZERO
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">10.000+</div>
              <div className="text-sm opacity-80">Empresas transformadas</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">+340%</div>
              <div className="text-sm opacity-80">Crescimento médio</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-80">Satisfação do cliente</div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-sm opacity-80">Tempo de resposta</div>
            </div>
          </div>
        </div>

        {/* Logos de Clientes */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-p3zero-black mb-8">
            Empresas que confiam na P3ZERO
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos.map((logo, index) => (
              <div 
                key={index}
                className="bg-neutral-100 px-6 py-3 rounded-lg font-semibold text-p3zero-gray hover:opacity-100 transition-opacity"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* CTA da Seção de Prova Social */}
        <div className="text-center">
          <div className="bg-primary text-white p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Pronto para ser nosso próximo case de sucesso?
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Veja como transformamos negócios como o seu e descubra o potencial que ainda não foi explorado no seu mercado.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-neutral-50 transition-colors flex items-center space-x-2 mx-auto">
              <span>Veja como transformamos negócios como o seu</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;