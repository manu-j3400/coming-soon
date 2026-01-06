import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 glow-cyan">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold text-lg text-foreground">Cyber Sentinel</span>
          </div>
          
          {/* CTA */}
          <Button variant="neonOutline" size="sm" asChild>
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
