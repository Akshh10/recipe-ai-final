
import React from "react";
import { User, Settings, CreditCard, BookOpen, Info, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, this would come from an auth context
  const user = {
    name: "Guest User",
    email: "guest@example.com",
    plan: "Free",
    planExpiry: "N/A"
  };
  
  const menuItems = [
    {
      icon: Settings,
      label: "Account Settings",
      link: "/account-settings"
    },
    {
      icon: CreditCard,
      label: "Subscription & Billing",
      link: "/subscription"
    },
    {
      icon: BookOpen,
      label: "Saved Recipes",
      link: "/saved-recipes"
    },
    {
      icon: Info,
      label: "Help & Support",
      link: "/help-support"
    }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // In a real app, this would clear auth tokens and redirect
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col pb-16">
      <section className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="font-heading text-3xl font-bold text-forest mb-6">Profile</h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-cream/50 h-16 w-16 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-terracotta" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-forest/70 text-sm">{user.email}</p>
              </div>
            </div>
            
            <div className="bg-cream/20 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-forest/70">Current Plan</p>
                  <p className="font-bold">{user.plan}</p>
                </div>
                {user.plan === "Free" ? (
                  <Button 
                    className="bg-terracotta hover:bg-terracotta/90 text-white"
                    onClick={() => navigate('/subscription')}
                  >
                    Upgrade
                  </Button>
                ) : (
                  <p className="text-sm text-forest/70">Expires: {user.planExpiry}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow mb-6">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.label}>
                <button 
                  onClick={() => navigate(item.link)}
                  className="flex items-center justify-between p-4 w-full text-left hover:bg-cream/10"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-terracotta mr-3" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-forest/50" />
                </button>
                {index < menuItems.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-forest/20 text-forest/70 mb-4"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
          
          <p className="text-center text-xs text-forest/50">
            Recipe AI v1.0.0
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
