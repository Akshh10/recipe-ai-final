
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Globe, Phone } from 'lucide-react';

interface LoginProps {
  onToggleView: () => void;
  onSuccess: () => void;
  onPhoneAuth: () => void;
  onGoogleAuth: () => void;
}

const Login = ({ onToggleView, onSuccess, onPhoneAuth, onGoogleAuth }: LoginProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mock login success
    toast({
      title: "Login Successful",
      description: "Welcome back to Recipe AI!",
      className: "bg-cream text-forest",
    });
    
    onSuccess();
  };

  return (
    <div className="space-y-4 py-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/90">
          Log In
        </Button>
      </form>

      <div className="text-center">
        <Button variant="link" onClick={onToggleView} className="text-forest">
          Don't have an account? Sign up
        </Button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={onPhoneAuth}
        >
          <Phone className="h-4 w-4" />
          <span>Phone</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={onGoogleAuth}
        >
          <Globe className="h-4 w-4" />
          <span>Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
