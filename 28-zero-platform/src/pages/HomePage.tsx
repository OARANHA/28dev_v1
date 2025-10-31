import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProblemsSection } from '../components/home/ProblemsSection';
import { SolutionsSection } from '../components/home/SolutionsSection';
import { SocialProofSection } from '../components/home/SocialProofSection';
import { CredibilitySection } from '../components/home/CredibilitySection';
import { PricingSection } from '../components/home/PricingSection';
import { CTASection } from '../components/home/CTASection';
import { HomeHeader } from '../components/home/HomeHeader';
import { HomeFooter } from '../components/home/HomeFooter';
import { LeadModal } from '../components/home/LeadModal';
import { ROICalculator } from '../components/home/ROICalculator';
import { ChatbotWidget } from '../components/home/ChatbotWidget';

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [modalType, setModalType] = useState('Fale com um especialista');

  const handleOpenModal = (type = 'Fale com um especialista') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSelectPricing = (plan: string) => {
    if (plan === 'Calculadora ROI') {
      setIsCalculatorOpen(true);
    } else {
      handleOpenModal(`Interessado no plano: ${plan}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HomeHeader onOpenModal={handleOpenModal} />
      <main>
        <HeroSection onOpenModal={handleOpenModal} />
        <ProblemsSection onOpenModal={handleOpenModal} />
        <SolutionsSection />
        <SocialProofSection />
        <CredibilitySection />
        <PricingSection onSelectPlan={handleSelectPricing} />
        <CTASection onOpenModal={handleOpenModal} />
      </main>
      <HomeFooter onOpenModal={handleOpenModal} />
      
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        ctaType={modalType}
      />
      <ROICalculator 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      
      <ChatbotWidget 
        onOpenModal={handleOpenModal}
        onSelectPricing={handleSelectPricing}
      />
    </div>
  );
}
