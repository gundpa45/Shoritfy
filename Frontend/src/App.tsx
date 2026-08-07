import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePipelineLoader } from './components/InteractivePipelineLoader';
import { InteractiveStudioPreview } from './components/InteractiveStudioPreview';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { FeatureGrid } from './components/FeatureGrid';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { DashboardView } from './components/DashboardView';
import type { ViewMode } from './types';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Pro Viral', price: '$29/mo' });

  const handleProcessUrl = (url: string) => {
    setProcessedUrl(url);
    setIsProcessing(true);
    // Smooth scroll to loader
    setTimeout(() => {
      document.getElementById('pipeline-loader')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePipelineComplete = () => {
    setIsProcessing(false);
    // Smooth scroll to preview
    setTimeout(() => {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenPricing = (planName = 'Pro Viral', price = '$29/mo') => {
    setSelectedPlan({ name: planName, price });
    setIsCheckoutOpen(true);
  };

  if (viewMode === 'dashboard') {
    return <DashboardView onBackToLanding={() => setViewMode('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Bar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenPricing={() => handleOpenPricing()}
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero onProcessUrl={handleProcessUrl} />

        {/* Live Processing Pipeline Animation */}
        {isProcessing && (
          <InteractivePipelineLoader
            url={processedUrl}
            onComplete={handlePipelineComplete}
          />
        )}

        {/* Interactive Studio Preview */}
        <InteractiveStudioPreview onOpenPricing={() => handleOpenPricing()} />

        {/* Before & After Comparison Slider */}
        <BeforeAfterComparison />

        {/* Feature Grid */}
        <FeatureGrid />

        {/* Creator Testimonials */}
        <Testimonials />

        {/* Pricing Tiers */}
        <Pricing onSelectPlan={(name, price) => handleOpenPricing(name, price)} />

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
