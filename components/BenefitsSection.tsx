import { Clock, Home, FileText, Network } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Home,
      title: "Dedicated Spaces",
      description: "Professional meeting environments designed for collaborative learning"
    },
    {
      icon: Clock,
      title: "Structured Time",
      description: "Optimized session timing that maximizes learning and engagement"
    },
    {
      icon: FileText,
      title: "Proven Framework",
      description: "Battle-tested schemas that guide productive discussions and knowledge sharing"
    },
    {
      icon: Network,
      title: "Professional Network",
      description: "Connect with like-minded professionals in your field and beyond"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6 mb-12">
              <h2 className="text-3xl lg:text-5xl">What We Provide</h2>
              <p className="text-xl text-muted-foreground">
                MindHub takes care of the logistics so you can focus on what matters most - learning and growing together.
              </p>
            </div>
            
            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop"
              alt="Modern collaborative workspace"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}