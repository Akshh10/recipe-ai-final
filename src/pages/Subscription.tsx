import React from "react";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const plans = [
    {
      name: "Free",
      price: "$0/month",
      features: [
        "2 scans per day",
        "Basic recipe search",
        "Limited recipe catalog access"
      ],
      current: true
    },
    {
      name: "Weekly",
      price: "$1.99/week",
      features: [
        "Unlimited recipes",
        "Advanced ingredient matching",
        "Full recipe catalog access",
        "Custom meal planning",
        "Nutritional information"
      ],
      current: false
    },
    {
      name: "Quarterly",
      price: "$14.99/3 months",
      features: [
        "Everything in Weekly",
        "Ingredient substitutions",
        "No ads",
        "Priority support"
      ],
      current: false
    },
    {
      name: "Annual",
      price: "$49.99/year",
      features: [
        "Everything in Quarterly",
        "Early access features",
        "Family meal planning",
        "Grocery list sharing"
      ],
      current: false
    }
  ];
  
  const handleUpgrade = (planName: string) => {
    toast({
      title: "Subscription",
      description: `You selected the ${planName} plan. This feature is coming soon!`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <header className="bg-white p-4 sticky top-0 z-10 flex items-center shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/profile")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold font-heading">Subscription & Billing</h1>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="bg-cream/20 p-4 rounded-lg">
            <h2 className="font-bold text-lg mb-2">Current Plan</h2>
            <p className="text-forest/70 text-sm">You are currently on the Free plan.</p>
            <p className="mt-2 text-sm">Upgrade to unlock premium features and unlimited recipes!</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Available Plans</h2>
            
            {plans.map((plan) => (
              <div key={plan.name} className={`border rounded-lg p-4 ${plan.current ? 'border-terracotta bg-cream/10' : 'border-forest/10'}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="font-medium text-forest">{plan.price}</p>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-forest/80">
                      <Check className="h-4 w-4 text-terracotta" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.current ? (
                  <Button disabled className="w-full bg-gray-300">Current Plan</Button>
                ) : (
                  <Button 
                    onClick={() => handleUpgrade(plan.name)} 
                    className="w-full bg-terracotta hover:bg-terracotta/90"
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-terracotta" />
              Payment Methods
            </h2>
            
            <p className="text-sm text-forest/70">No payment methods added yet.</p>
            
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
          
          <p className="text-xs text-center text-forest/50 mt-8">
            You can cancel your subscription at any time. 
            <br />Billing is monthly and will renew automatically.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
