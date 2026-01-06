import { Container, Cpu, Database, Shield } from "lucide-react";

const TechCard = () => {
  const specs = [
    { icon: Container, label: "Dockerized", value: "Instant Deployment" },
    { icon: Cpu, label: "ML Engine", value: "Random Forest" },
    { icon: Database, label: "Training Data", value: "10,000+ Samples" },
    { icon: Shield, label: "Detection Rate", value: "99.7%" },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// UNDER_THE_HOOD</span>
          <h2 className="text-3xl md:text-5xl font-bold font-mono">
            Built for <span className="text-gradient">Speed & Precision</span>
          </h2>
        </div>
        
        {/* Main Tech Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/50 via-neon-purple/30 to-primary/50">
            <div className="relative bg-card rounded-xl p-8 md:p-12 overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 grid-pattern opacity-20" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm font-mono text-muted-foreground">cyber-sentinel-engine.spec</span>
                </div>
                
                {/* Code Block */}
                <div className="font-mono text-sm md:text-base space-y-2 mb-8 p-4 bg-background/50 rounded-lg border border-border">
                  <div>
                    <span className="text-neon-purple">class</span>{" "}
                    <span className="text-primary">CyberSentinel</span>{" "}
                    <span className="text-muted-foreground">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-muted-foreground">engine:</span>{" "}
                    <span className="text-green-400">&quot;Docker Container&quot;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-muted-foreground">model:</span>{" "}
                    <span className="text-green-400">&quot;RandomForestClassifier&quot;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-muted-foreground">training_samples:</span>{" "}
                    <span className="text-primary">10_847</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-muted-foreground">avg_response_time:</span>{" "}
                    <span className="text-primary">&quot;47ms&quot;</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{"}"}</span>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-all duration-300 group"
                    >
                      <spec.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs text-muted-foreground mb-1">{spec.label}</div>
                      <div className="font-mono font-semibold text-foreground">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechCard;
