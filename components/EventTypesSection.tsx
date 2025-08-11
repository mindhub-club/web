import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Brain, Code, Palette, Scale, Rocket, Users, Lightbulb, Globe, Mail, ExternalLink } from "lucide-react";

export function EventTypesSection() {
  const clubs = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      email: "ai@mindhub.club",
      description: "Explore the latest in artificial intelligence, deep learning, and practical ML applications",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      members: "28 members"
    },
    {
      icon: Code,
      title: "Software Engineering",
      email: "engineering@mindhub.club", 
      description: "Dive deep into software architecture, development best practices, and emerging technologies",
      color: "text-green-600", 
      bgColor: "bg-green-50",
      members: "45 members"
    },
    {
      icon: Palette,
      title: "Design & UX",
      email: "design@mindhub.club",
      description: "Discuss user experience design, product design principles, and design thinking methodologies",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      members: "32 members"
    },
    {
      icon: Scale,
      title: "Law & Legal Tech",
      email: "law@mindhub.club",
      description: "Navigate legal frameworks, compliance, intellectual property, and legal technology innovations",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      members: "19 members"
    },
    {
      icon: Rocket,
      title: "Startup & Entrepreneurship",
      email: "startup@mindhub.club",
      description: "Share insights on building startups, fundraising, scaling, and entrepreneurial strategies",
      color: "text-red-600",
      bgColor: "bg-red-50",
      members: "38 members"
    },
    {
      icon: Users,
      title: "Product Management",
      email: "product@mindhub.club",
      description: "Learn about product strategy, user research, agile methodologies, and product-market fit",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      members: "26 members"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Strategy",
      email: "innovation@mindhub.club",
      description: "Explore business innovation, strategic planning, and disruptive technologies",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      members: "22 members"
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      email: "marketing@mindhub.club",
      description: "Discuss growth hacking, digital marketing strategies, and customer acquisition",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      members: "31 members"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">Specialized Clubs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join focused communities organized around your professional interests. Each club has its own identity and dedicated space for deep, specialized discussions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${club.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <club.icon className={`w-6 h-6 ${club.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{club.members}</span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg">{club.title}</h3>
                  
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">{club.email}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {club.description}
                  </p>
                </div>

                <Button variant="outline" size="sm" className="w-full group">
                  Join Club
                  <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full">
            <span className="text-sm text-muted-foreground">Can't find your specialty? We're always expanding our club offerings.</span>
          </div>
          
          <Button variant="outline" className="mx-auto">
            Suggest a New Club
          </Button>
        </div>
      </div>
    </section>
  );
}