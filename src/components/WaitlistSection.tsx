import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, Users, CheckCircle, Github, RefreshCw } from "lucide-react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Note: LocalStorage check is removed from useEffect so the form 
  // loads by default, allowing you to enter different emails easily.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({ title: "Secure Entry Confirmed" });
      } else {
        throw new Error("Security blockage");
      }
    } catch (error) {
      toast({ title: "Connection Terminated", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent z-0" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-mono text-primary/80 mb-6">
            <Users className="w-3.5 h-3.5" />
            500+ developers waiting
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
            Join the <span className="text-gradient">Beta Waitlist</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10">
            Be the first to experience AI-powered code security. Limited spots available.
          </p>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-background/40 px-4 py-2 shadow-[0_0_0_1px_rgba(34,211,238,0.1)] backdrop-blur">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="developer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-8 border-0 bg-transparent px-0 py-0 text-sm font-mono focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button type="submit" variant="hero" disabled={isSubmitting} className="h-12 rounded-full px-6 font-mono">
                {isSubmitting ? "Syncing..." : "Join Waitlist"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center p-8 rounded-xl bg-primary/5 border border-primary/20 max-w-md mx-auto animate-in fade-in zoom-in">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-mono font-bold mb-2">Success</h3>
              <p className="text-muted-foreground mb-6">Email securely registered.</p>
              
              <div className="w-full space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => window.open('https://github.com/manu-j3400/coming-soon', '_blank')}
                >
                  <Github className="w-4 h-4" /> Star on GitHub
                </Button>
                
                {/* THIS IS YOUR FIX: Reset button to enter another email */}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mx-auto transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> Register another email
                </button>
              </div>
            </div>
          )}
          {!isSubmitted ? (
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;