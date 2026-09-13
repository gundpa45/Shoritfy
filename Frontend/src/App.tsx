import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { DashboardView } from './components/DashboardView';
import { CreatorStudio } from './pages/CreatorStudio';
import { LandingPage } from './pages/LandingPage';
import { UrlPage } from './pages/UrlPage';
import type { ViewMode } from './types';

export function App() {
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Pro Viral', price: '$29/mo' });

  const navigate = useNavigate();
  const location = useLocation();
  const viewMode: ViewMode = location.pathname.startsWith('/studio') ? 'dashboard' : 'landing';

  const handleOpenPricing = (planName = 'Pro Viral', price = '$29/mo') => {
    setSelectedPlan({ name: planName, price });
    setIsCheckoutOpen(true);
  };

  if (location.pathname === '/studio') return <CreatorStudio />;
  if (location.pathname === '/studio/demo') return <DashboardView onBackToLanding={() => navigate('/studio')} />;

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={(mode) => {
          navigate(mode === 'landing' ? '/' : '/studio');
        }}
        onOpenPricing={() => handleOpenPricing()}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenPricing={handleOpenPricing} />} />
          <Route path="/url" element={<UrlPage />} />
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
