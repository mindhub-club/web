import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { EventTypesSection } from "./components/EventTypesSection";
import { InteractiveMap } from "./components/InteractiveMap";
import { BenefitsSection } from "./components/BenefitsSection";
import { LocationsSection } from "./components/LocationsSection";
import { CTASection } from "./components/CTASection";
import { SimpleRouter, navigate } from "./components/SimpleRouter";

export default function App() {
  return (
    <SimpleRouter>
      <div className="min-h-screen">
        <Header />
        
        <main>
          <HeroSection />
          
          <div id="how-it-works">
            <HowItWorksSection />
          </div>

          <div id="topics">
            <EventTypesSection />
          </div>
          
          <div id="locations">
            <InteractiveMap />
          </div>
          
          <LocationsSection />
          
          <div id="benefits">
            <BenefitsSection />
          </div>
          
          <CTASection />
        </main>
        
        <footer className="bg-muted py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">MH</span>
                </div>
                <span className="text-muted-foreground">© 2025 MindHub Club. All rights reserved.</span>
              </div>
              
              <div className="flex gap-6 text-sm text-muted-foreground">
                <button 
                  onClick={() => navigate('/privacy')} 
                  className="hover:text-foreground transition-colors"
                >
                  Privacy
                </button>
                <button 
                  onClick={() => navigate('/terms')} 
                  className="hover:text-foreground transition-colors"
                >
                  Terms
                </button>
                <a href="mailto:contact@mindhub.club" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SimpleRouter>
  );
}