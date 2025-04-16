
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Onboarding from "./components/Onboarding";
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
    });
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FEF7CD] shadow-sm z-10 safe-bottom border-t border-[#F1F0FB]">
      <ul className="flex justify-around items-center py-3 px-6">
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/' ? 'text-terracotta' : 'text-forest'}`}
            onClick={() => navigate('/')}
          >
            <HomeIcon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
        </li>
        <li className="relative">
          <button 
            className="flex flex-col items-center justify-center bg-terracotta text-white rounded-full p-4 -mt-8 shadow-md hover:bg-terracotta/90 transition-colors"
            onClick={handleScanClick}
          >
            <Scan className="h-6 w-6" />
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/favorites' ? 'text-terracotta' : 'text-forest'}`}
            onClick={() => navigate('/favorites')}
          >
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Recipes</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/settings" element={React.lazy(() => import('./pages/profile/Settings'))} />
        <Route path="/profile/subscription" element={React.lazy(() => import('./pages/profile/Subscription'))} />
        <Route path="/profile/saved-recipes" element={React.lazy(() => import('./pages/profile/SavedRecipes'))} />
        <Route path="/profile/support" element={React.lazy(() => import('./pages/profile/Support'))} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileNav />
    </>
  );
};

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
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LikedRecipesProvider>
    </QueryClientProvider>
  );
};

export default App;
