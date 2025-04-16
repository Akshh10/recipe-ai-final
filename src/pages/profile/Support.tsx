
import React from "react";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Support = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-cream/10 pb-24">
      <div className="px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/profile')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        <h1 className="font-heading text-3xl font-bold text-forest mb-6">Help & Support</h1>
        
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Phone Support
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">How do I search for recipes?</h3>
                <p className="text-sm text-forest/70">Enter your available ingredients in the search bar and click "Search Recipes" to find matching recipes.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Can I save my favorite recipes?</h3>
                <p className="text-sm text-forest/70">Yes! Click the heart icon on any recipe to save it to your favorites.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How do I upgrade my account?</h3>
                <p className="text-sm text-forest/70">Visit the Subscription & Billing section in your profile to view and select available plans.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
