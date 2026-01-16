import { Shield, Zap, Lock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-up opacity-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-primary">AI-Powered Security</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono leading-tight mb-6 animate-fade-up opacity-0 animation-delay-200">
          Stop Malicious Code{" "}
          <span className="text-gradient">
            Before It Executes.
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up opacity-0 animation-delay-400">
          The first AI-powered code analysis engine that uses{" "}
          <span className="text-primary font-medium">Supervised Machine Learning</span>{" "}
          to detect hidden threats in your AST data.
        </p>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-up opacity-0 animation-delay-600">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">ML-Powered Detection</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Zap className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-foreground">Millisecond Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Lock className="w-4 h-4 text-neon-pink" />
            <span className="text-sm text-foreground">Zero False Positives</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
