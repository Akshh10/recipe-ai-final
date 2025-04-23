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
import Header from "./components/Header";
import { LikedRecipesProvider } from "./components/LikedRecipesContext";
import { Home as HomeIcon, Scan, BookOpen } from "lucide-react";
import { useToast } from "./hooks/use-toast";
import AuthModal from "./components/auth/AuthModal";
import AccountSettings from "./pages/AccountSettings";
import HelpSupport from "./pages/HelpSupport";
import Subscription from "./pages/Subscription";
import SavedRecipes from "./pages/SavedRecipes";
import ScanPage from "./pages/Scan";
import { ScanProvider } from './context/ScanContext';


const queryClient = new QueryClient();

// Mobile app navigation component
const MobileNav = () => {
 
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
  className="flex flex-col items-center justify-center bg-terracotta text-white rounded-full p-4"
  onClick={() => navigate('/scan')}
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

// Conditional Header component that shows only on specified routes
const ConditionalHeader = () => {
  const location = useLocation();
  // Only show header on certain pages
  const showHeader = ['/', '/favorites'].includes(location.pathname);
  
  return showHeader ? <Header /> : null;
};

// Put this in the same App.tsx above AppRoutes

const ConditionalMobileNav = () => {
  const location = useLocation();
  const hideOnPaths = ['/scan']; // ✅ Add other routes too if needed later
  if (hideOnPaths.includes(location.pathname)) {
    return null; // ❌ No mobile nav on scan page
  }
  return <MobileNav />; // ✅ Show nav normally
};


const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <ConditionalHeader />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>

      {/* ✅ Use ConditionalMobileNav here */}
      <ConditionalMobileNav />
    </>
  );
};


const App = () => {
  // Force showing onboarding for demonstration
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authType, setAuthType] = useState<"login" | "signup" | "phone" | "google">("signup");
  
  // We'll force onboarding to show by removing the localStorage check
  useEffect(() => {
    // Remove any existing onboarding completion flag
    localStorage.removeItem("onboardingComplete");
  }, []);
  
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setShowOnboarding(false);
  };
  
  const handleShowAuth = (type: "login" | "signup" | "phone" | "google") => {
    setAuthType(type);
    setShowAuthModal(true);
  };

  return (
  <QueryClientProvider client={queryClient}>
    <ScanProvider> {/* ✅ Wrap the app with this */}
      <LikedRecipesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showOnboarding && (
            <Onboarding 
              onComplete={handleOnboardingComplete} 
              onShowAuth={handleShowAuth}
            />
          )}
          {showAuthModal && (
            <AuthModal 
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              initialView={authType}
            />
          )}
          <BrowserRouter>
            {!showOnboarding && <AppRoutes />}
          </BrowserRouter>
        </TooltipProvider>
      </LikedRecipesProvider>
    </ScanProvider>
  </QueryClientProvider>
);

};



export default App;
