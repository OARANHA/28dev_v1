import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProblemsSection from './components/ProblemsSection';
import SolutionsSection from './components/SolutionsSection';
import SocialProofSection from './components/SocialProofSection';
import CredibilitySection from './components/CredibilitySection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import ROICalculator from './components/ROICalculator';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
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
    <div className="min-h-screen bg-neutral-950 dark">
      <Header onOpenModal={handleOpenModal} />
      <main>
        <HeroSection onOpenModal={handleOpenModal} />
        <ProblemsSection onOpenModal={handleOpenModal} />
        <SolutionsSection />
        <SocialProofSection />
        <CredibilitySection />
        <PricingSection onSelectPlan={handleSelectPricing} />
        <CTASection onOpenModal={handleOpenModal} />
      </main>
      <Footer onOpenModal={handleOpenModal} />
      
      {/* Modals */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        ctaType={modalType}
      />
      <ROICalculator 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      
      {/* Chatbot */}
      <Chatbot 
        onOpenModal={handleOpenModal}
        onSelectPricing={handleSelectPricing}
      />
    </div>
  );
}

export default App
