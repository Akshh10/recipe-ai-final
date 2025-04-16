
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cream/10 pb-24">
      <div className="px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/profile')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <h1 className="font-heading text-3xl font-bold text-forest mb-6">Account Settings</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-forest/70 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest/70 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Email notifications for new recipe matches</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Dark mode (Coming soon)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
