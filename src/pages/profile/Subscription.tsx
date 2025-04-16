
import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Subscription = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cream/10 pb-24">
      <div className="px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/profile')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <h1 className="font-heading text-3xl font-bold text-forest mb-6">Subscription & Billing</h1>
        
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
            <div className="bg-cream/20 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-forest/70">Free Plan</p>
                  <p className="font-bold">Basic Features</p>
                </div>
                <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
                  Upgrade
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Pro Plan</h3>
                    <p className="text-sm text-forest/70">$9.99/month</p>
                  </div>
                  <Button variant="outline">Select</Button>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-terracotta mr-2" />
                    Unlimited recipe searches
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-terracotta mr-2" />
                    AI-powered recommendations
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-terracotta mr-2" />
                    Shopping list feature
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
