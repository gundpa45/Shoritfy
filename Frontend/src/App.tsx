import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { DashboardView } from './components/DashboardView';
import { LandingPage } from './pages/LandingPage';
import { UrlPage } from './pages/UrlPage';
import type { ViewMode } from './types';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Pro Viral', price: '$29/mo' });

  const navigate = useNavigate();

  const handleOpenPricing = (planName = 'Pro Viral', price = '$29/mo') => {
    setSelectedPlan({ name: planName, price });
    setIsCheckoutOpen(true);
  };

  if (viewMode === 'dashboard') {
    return <DashboardView onBackToLanding={() => {
      setViewMode('landing');
      navigate('/');
    }} />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={(mode) => {
          setViewMode(mode);
          if (mode === 'landing') navigate('/');
        }}
        onOpenPricing={() => handleOpenPricing()}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenPricing={handleOpenPricing} />} />
          <Route path="/url" element={<UrlPage onOpenPricing={() => handleOpenPricing()} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        planName={selectedPlan.name}
        price={selectedPlan.price}
      />

    </div>
  );
}

export default App;
