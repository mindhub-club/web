import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-sm">MH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-tight">MindHub Club</span>
              <span className="text-xs text-muted-foreground font-mono">@mindhub_club</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#topics" className="text-muted-foreground hover:text-foreground transition-colors">
              Clubs
            </a>
            <a href="#locations" className="text-muted-foreground hover:text-foreground transition-colors">
              Locations
            </a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
              Benefits
            </a>
          </nav>
          
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Join a Club
          </Button>
        </div>
      </div>
    </header>
  );
}