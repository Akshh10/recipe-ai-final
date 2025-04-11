
import { useState } from "react";
import { ChefHat, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to join the waitlist.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Thank you for joining!",
        description: "We'll notify you when Recipe AI launches.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-terracotta/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <ChefHat className="h-6 w-6 text-terracotta" />
          </div>
          <DialogTitle className="text-2xl font-heading text-forest">
            Join the Recipe AI Waitlist
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <p className="text-center text-forest/80">
              Be the first to experience the future of cooking when we launch!
            </p>
            
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-terracotta hover:bg-terracotta/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Join Waitlist"
              )}
            </Button>
            
            <p className="text-xs text-center text-forest/60">
              We respect your privacy and will never share your information.
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 mt-4 animate-fade-in">
            <div className="mx-auto bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-lg">You're on the list!</h3>
            <p className="text-forest/80">
              Thanks for joining our waitlist. We'll notify you when Recipe AI launches.
            </p>
            <Button
              variant="outline"
              onClick={onClose}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
