import { Hero } from '../components/Hero';
import { BeforeAfterComparison } from '../components/BeforeAfterComparison';
import { FeatureGrid } from '../components/FeatureGrid';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onOpenPricing: (planName?: string, price?: string) => void;
}

export const LandingPage = ({ onOpenPricing }: LandingPageProps) => {
  const navigate = useNavigate();

  const handleProcessUrl = (url: string) => {
    navigate(`/url?video=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <Hero onProcessUrl={handleProcessUrl} />
      <BeforeAfterComparison />
      <FeatureGrid />
      <Testimonials />
      <Pricing onSelectPlan={(name, price) => onOpenPricing(name, price)} />
    </>
  );
};
