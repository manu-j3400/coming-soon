import { Shield, Sparkles } from "lucide-react";

const SocialProof = () => {
  const logos = [
    { name: "TechCorp", initial: "T" },
    { name: "SecureStack", initial: "S" },
    { name: "DevOps Pro", initial: "D" },
    { name: "CloudGuard", initial: "C" },
    { name: "CodeShield", initial: "CS" },
  ];

  return (
    <section className="relative py-24 overflow-hidden border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* Trusted By Section */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground font-mono mb-8">TRUSTED BY SECURITY TEAMS AT</p>
          
          {/* Logo Placeholders */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <span className="font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  {logo.initial}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* A.C.I.D. Intelligence Badge */}
        <div className="flex justify-center">
          <div className="relative inline-flex items-center gap-4 px-8 py-4 rounded-xl bg-gradient-to-r from-neon-purple/10 via-primary/10 to-neon-purple/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 group">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-purple/5 to-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              
              {/* Text */}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Powered by</span>
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <span className="font-mono font-bold text-lg text-gradient">A.C.I.D. Intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
