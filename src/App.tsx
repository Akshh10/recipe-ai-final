
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
import { Home as HomeIcon, Heart, User } from "lucide-react";

const queryClient = new QueryClient();

// Mobile app navigation component
const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10 safe-bottom">
      <ul className="flex justify-around py-3">
        <li>
          <button 
            className={`flex flex-col items-center text-xs ${location.pathname === '/' ? 'text-terracotta' : 'text-forest'}`}
            onClick={() => navigate('/')}
          >
            <HomeIcon className={`h-6 w-6 mb-1 ${location.pathname === '/' ? 'text-terracotta' : 'text-forest'}`} />
            <span>Home</span>
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center text-xs ${location.pathname === '/favorites' ? 'text-terracotta' : 'text-forest'}`}
            onClick={() => navigate('/favorites')}
          >
            <Heart className={`h-6 w-6 mb-1 ${location.pathname === '/favorites' ? 'text-terracotta' : 'text-forest'}`} />
            <span>Favorites</span>
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center text-xs ${location.pathname === '/profile' ? 'text-terracotta' : 'text-forest'}`}
            onClick={() => navigate('/profile')}
          >
            <User className={`h-6 w-6 mb-1 ${location.pathname === '/profile' ? 'text-terracotta' : 'text-forest'}`} />
            <span>Profile</span>
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
