import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Brain, Code, Palette, Scale, Rocket, Users, Mail } from "lucide-react";

export function HeroSection() {
  const featuredClubs = [
    { icon: Brain, email: "ai@mindhub.club", color: "text-blue-600" },
    { icon: Code, email: "engineering@mindhub.club", color: "text-green-600" },
    { icon: Palette, email: "design@mindhub.club", color: "text-purple-600" },
    { icon: Rocket, email: "startup@mindhub.club", color: "text-red-600" }
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl tracking-tight">
              Welcome to <span className="text-primary">MindHub Club</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Join specialized professional clubs where experts gather to learn collaboratively. 
              From <strong>AI</strong> to <strong>Design</strong>, each club has its own identity and dedicated community.
            </p>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Featured Clubs:</p>
            <div className="grid grid-cols-2 gap-3">
              {featuredClubs.map((club, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-primary/10">
                  <club.icon className={`w-5 h-5 ${club.color}`} />
                  <span className="text-sm font-mono text-muted-foreground truncate">{club.email}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              <Mail className="w-5 h-5 mr-2" />
              Join a Club
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Explore All Clubs
            </Button>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>8 Active Clubs • 2 Locations</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
            alt="Diverse professionals collaborating in specialized groups"
            className="rounded-lg shadow-2xl w-full h-auto"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm">130+ Active Members</p>
                <p className="text-xs text-muted-foreground">Across specialized clubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}