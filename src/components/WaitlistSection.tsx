import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NeonInput } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail, ArrowRight, Users, CheckCircle } from "lucide-react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    toast({
      title: "You're on the list!",
      description: "We'll notify you when Cyber Sentinel launches.",
    });
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4">
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
              Join <span className="text-primary font-semibold">500+</span> developers waiting for the Beta launch.
            </span>
          </div>
          
          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Joining...
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
            <div className="flex items-center justify-center gap-3 p-6 rounded-xl bg-primary/10 border border-primary/30 max-w-md mx-auto">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="font-mono text-foreground">You&apos;re on the list!</span>
            </div>
          )}
          
          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground mt-6">
            No spam, ever. We&apos;ll only email you about the beta launch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
