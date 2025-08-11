import { Users, RotateCcw, Calendar, MapPin } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Users,
      title: "Small Groups",
      description: "Join intimate groups of professionals who share your interests and career focus."
    },
    {
      icon: RotateCcw,
      title: "Rotative Learning",
      description: "Everyone takes turns leading discussions. No teachers - we all learn from each other."
    },
    {
      icon: Calendar,
      title: "Structured Sessions",
      description: "We provide the framework and timing to make every meeting productive and engaging."
    },
    {
      icon: MapPin,
      title: "Physical Spaces",
      description: "Meet in person at our dedicated spaces in Mallorca and Munich."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">How MindHub Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our self-managed learning approach puts you in control of your professional development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}