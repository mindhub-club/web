import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Mail, Plus } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-5xl">Ready to Join a Club?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connect with like-minded professionals in your specialty area. Join an existing club or help us start one in your city.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70" />
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
              <Button variant="secondary" size="lg" className="px-6">
                Join <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm opacity-70">
              Join our existing clubs in Mallorca & Munich
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="outline" size="lg" className="w-full border-white/30 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Start a Chapter
            </Button>
            <p className="text-sm opacity-70">
              Bring MindHub to your city - contact{" "}
              <span className="font-mono bg-white/10 px-1 rounded">expand@mindhub.club</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Browse All Clubs
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Learn About Our Process
          </Button>
        </div>
      </div>
    </section>
  );
}