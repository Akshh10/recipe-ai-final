
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./components/Onboarding";
import { LikedRecipesProvider } from "./components/LikedRecipesContext";

const queryClient = new QueryClient();

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingComplete");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <LikedRecipesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LikedRecipesProvider>
    </QueryClientProvider>
  );
};

export default App;
