
import React from "react";
import { ArrowLeft, User, Mail, Lock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings updated",
      description: "Your account settings have been saved successfully.",
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
        <h1 className="text-xl font-semibold font-heading">Account Settings</h1>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5 text-terracotta" />
              Personal Information
            </h2>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" defaultValue="Guest User" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input id="phone" placeholder="Add phone number" />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Mail className="h-5 w-5 text-terracotta" />
              Email Settings
            </h2>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" defaultValue="guest@example.com" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recipe Updates</p>
                <p className="text-sm text-forest/70">Receive updates about new recipes</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Newsletter</p>
                <p className="text-sm text-forest/70">Weekly cooking tips and tricks</p>
              </div>
              <Switch />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Lock className="h-5 w-5 text-terracotta" />
              Security
            </h2>
            
            <Button type="button" variant="outline" className="w-full">
              Change Password
            </Button>
          </div>
          
          <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/90">
            Save Changes
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AccountSettings;
