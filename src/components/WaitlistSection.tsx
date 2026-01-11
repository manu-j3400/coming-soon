import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NeonInput } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, ArrowRight, Users, CheckCircle, Github } from "lucide-react";
import { supabase } from "@/lib/supabase";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if they already joined on mount
  useEffect(() => {
    const joined = localStorage.getItem("cyberSentinel_joined");
    if (joined === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      // Handle Success OR Duplicate Entry (Code 23505)
      if (!error || error.code === '23505') {
        localStorage.setItem("cyberSentinel_joined", "true");
        setIsSubmitted(true);
        setEmail("");
        
        toast({
          title: error?.code === '23505' ? "Welcome back!" : "Access Granted",
          description: "You're on the secure waitlist for Cyber Sentinel.",
        });
        return;
      }
      throw error;
    } catch (error: any) {
      console.error('Error joining waitlist:', error);
      toast({
        title: "Connection Error",
        description: "Failed to reach the secure server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      {/* Background Effects - z-0 ensures it stays behind */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-0" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-pulse-glow">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          {/* Header */}
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-4">
            Get <span className="text-gradient">Early Access</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Be among the first to experience AI-powered code security.
          </p>
          
          {/* Waitlist Counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">
              Join <span className="text-primary font-semibold">50+</span> developers waiting for the Beta launch.
            </span>
          </div>
          
          {/* Conditional Rendering: Form vs Success State */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              {/* Anti-bot Honeypot (Invisible) */}
              <input type="text" name="b_name" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              
              <div className="flex-1 relative">
                <NeonInput
                  type="email"
                  placeholder="developer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="pr-4"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center p-8 rounded-xl bg-primary/5 border border-primary/20 max-w-md mx-auto animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-mono font-bold mb-2 text-foreground">Access Granted</h3>
              <p className="text-muted-foreground text-center mb-6">
                Your spot in the secure queue is reserved. We'll reach out when the beta terminal is ready.
              </p>
              
              <div className="w-full space-y-3 border-t border-border pt-6">
                <p className="text-xs font-mono text-primary uppercase tracking-widest text-center">Priority Task</p>
                <Button 
                  variant="outline" 
                  className="w-full gap-2 border-primary/30 hover:bg-primary/10 transition-all"
                  onClick={() => window.open('https://github.com/manu-j3400/coming-soon', '_blank')}
                >
                  <Github className="w-4 h-4" />
                  Star on GitHub
                </Button>
                <p className="text-[10px] text-muted-foreground text-center italic">
                  Starring the repository helps prioritize your beta access.
                </p>
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-6">
            No spam, ever. We&apos;ll only email you about the beta launch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;