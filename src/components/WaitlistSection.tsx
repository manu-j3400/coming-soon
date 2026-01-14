import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NeonInput } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { Mail, ArrowRight, Users, CheckCircle, Github, RefreshCw } from "lucide-react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Note: LocalStorage check is removed from useEffect so the form 
  // loads by default, allowing you to enter different emails easily.

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!token) {
    toast({ 
      title: "Security Verification Required", 
      description: "Please wait for the security check to complete.",
      variant: "destructive" 
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-0" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-4">
            Get <span className="text-gradient">Early Access</span>
          </h2>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <NeonInput
                  type="email"
                  placeholder="developer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />

                <div className="mt-4 flex justify-center">
                  <Turnstile 
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} 
                    onSuccess={(t) => {
                      console.log("Turnstile Token Received:", t); // This helps us debug
                      setToken(t);
                    }} 
                    onError={() => console.error("Turnstile Widget Failed to Load")} 
                  />
                </div>
              </div>
              <Button type="submit" variant="hero" disabled={isSubmitting} className="min-w-[140px]">
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
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;