import React from 'react';
import { Star, Quote } from 'lucide-react';

export function SocialProofSection() {
  const testimonials = [
    {
      name: 'Carlos Silva',
      company: 'TechSolutions',
      text: 'Em 3 meses, aumentamos nossas vendas em 280%. A equipe é excepcional!',
      rating: 5
    },
    {
      name: 'Maria Santos',
      company: 'E-commerce Plus',
      text: 'Finalmente encontramos uma agência que entrega o que promete. ROI incrível!',
      rating: 5
    },
    {
      name: 'João Oliveira',
      company: 'Indústria ABC',
      text: 'Profissionais altamente qualificados. Transformaram nosso marketing digital.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600">
            Mais de 10.000 empresas confiam em nosso trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-blue-600 mb-4 opacity-50" />
              <p className="text-gray-700 mb-4 italic">{testimonial.text}</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-black">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
