import { XCircle, CheckCircle, ArrowRight } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-4">
            Static Analysis is <span className="text-destructive">Broken.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Traditional tools rely on pattern matching and signature detection. 
            They miss what matters most.
          </p>
        </div>
        
        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Tools */}
          <div className="relative p-8 rounded-xl bg-card border border-border hover:border-destructive/50 transition-all duration-300 group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-destructive/50 to-transparent rounded-t-xl" />
            <h3 className="text-xl font-mono font-semibold mb-6 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-destructive" />
              Traditional SAST Tools
            </h3>
            <ul className="space-y-4">
              {[
                "Pattern-based detection misses novel threats",
                "High false positive rates waste developer time",
                "Slow scanning blocks CI/CD pipelines",
                "Can't understand code context or intent",
                "Easily bypassed with obfuscation",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cyber Sentinel */}
          <div className="relative p-8 rounded-xl bg-card border border-border hover:border-glow transition-all duration-300 group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-neon-purple rounded-t-xl" />
            <h3 className="text-xl font-mono font-semibold mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              Cyber Sentinel
            </h3>
            <ul className="space-y-4">
              {[
                "Random Forest Classifier trained on 10k+ samples",
                "Near-zero false positives with ML confidence scoring",
                "Millisecond analysis via Dockerized engine",
                "Deep AST understanding catches semantic threats",
                "Detects obfuscated and polymorphic malware",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="#waitlist" className="inline-flex items-center gap-2 text-primary font-mono hover:gap-4 transition-all duration-300">
            See how it works
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
