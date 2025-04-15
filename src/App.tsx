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
import { Home as HomeIcon, Search, Scan, Clock, User } from "lucide-react";

const queryClient = new QueryClient();

// Mobile app navigation component
const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] shadow-lg z-10 safe-bottom">
      <ul className="flex justify-around items-center py-4 px-6">
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/' ? 'text-[#0FA0CE]' : 'text-white'}`}
            onClick={() => navigate('/')}
          >
            <HomeIcon className="h-6 w-6 mb-1" />
            <span className="text-xs">Home</span>
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/search' ? 'text-[#0FA0CE]' : 'text-white'}`}
            onClick={() => navigate('/search')}
          >
            <Search className="h-6 w-6 mb-1" />
            <span className="text-xs">Search</span>
          </button>
        </li>
        <li>
          <button 
            className="flex flex-col items-center justify-center bg-[#0FA0CE] text-white rounded-full p-4 -mt-8 shadow-lg"
          >
            <Scan className="h-8 w-8" />
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/history' ? 'text-[#0FA0CE]' : 'text-white'}`}
            onClick={() => navigate('/history')}
          >
            <Clock className="h-6 w-6 mb-1" />
            <span className="text-xs">History</span>
          </button>
        </li>
        <li>
          <button 
            className={`flex flex-col items-center ${location.pathname === '/profile' ? 'text-[#0FA0CE]' : 'text-white'}`}
            onClick={() => navigate('/profile')}
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs">Profile</span>
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
