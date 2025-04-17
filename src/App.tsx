
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Onboarding from "./components/Onboarding";
import TransitionScreen from "./components/TransitionScreen";
import Header from "./components/Header";
import { LikedRecipesProvider } from "./components/LikedRecipesContext";
import { Home as HomeIcon, Scan, BookOpen } from "lucide-react";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

// Mobile app navigation component
const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleScanClick = () => {
    toast({
      title: "Scanner",
      description: "Scanner feature coming soon!",
      className: "bg-cream text-forest",
    });
  };
  
  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-offwhite shadow-lg z-10 safe-bottom border-t border-cream"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <ul className="flex justify-around items-center py-3 px-6">
        <motion.li whileTap={{ scale: 0.9 }}>
          <button 
            className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/' ? 'text-terracotta scale-110' : 'text-forest'}`}
            onClick={() => navigate('/')}
          >
            <HomeIcon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
        </motion.li>
        <motion.li className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button 
            className="flex flex-col items-center justify-center bg-terracotta text-white rounded-full p-4 -mt-8 shadow-md hover:bg-terracotta/90 transition-colors hover:shadow-xl transform transition-transform hover:scale-105"
            onClick={handleScanClick}
          >
            <Scan className="h-6 w-6" />
          </button>
        </motion.li>
        <motion.li whileTap={{ scale: 0.9 }}>
          <button 
            className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/favorites' ? 'text-terracotta scale-110' : 'text-forest'}`}
            onClick={() => navigate('/favorites')}
          >
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Recipes</span>
          </button>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Header />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <MobileNav />
    </>
  );
};

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false); // Initially set to false
  const [showTransition, setShowTransition] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if onboarding has been completed before
    const hasCompletedOnboarding = localStorage.getItem("onboardingComplete");
    
    // Only show onboarding if it hasn't been completed
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
    
    // Remove this comment if you want to test onboarding every time:
    // localStorage.removeItem("onboardingComplete");
  }, []);
  
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
    setShowTransition(true);
  };
  
  const handleTransitionComplete = () => {
    setShowTransition(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <LikedRecipesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
          {showTransition && <TransitionScreen onComplete={handleTransitionComplete} />}
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LikedRecipesProvider>
    </QueryClientProvider>
  );
};

export default App;
