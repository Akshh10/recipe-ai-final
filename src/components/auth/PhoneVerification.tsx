
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Phone, ArrowRight } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface PhoneVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ onSuccess, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Mock sending OTP
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone",
    });
    setShowOTP(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code",
        variant: "destructive",
      });
      return;
    }
    
    // Mock OTP verification success
    toast({
      title: "Verification Successful",
      description: "Your phone number has been verified",
      className: "bg-cream text-forest",
    });
    
    onSuccess();
  };

  return (
    <div className="space-y-4 py-2">
      {!showOTP ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Enter your phone number" 
                className="pl-10" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/90">
            Send Verification Code
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full text-forest"
            onClick={onBack}
          >
            Go Back
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block text-center">
              Enter Verification Code
            </label>
            <p className="text-sm text-gray-500 text-center">
              We've sent a 4-digit code to {phoneNumber}
            </p>
            <div className="flex justify-center my-4">
              <InputOTP 
                maxLength={4} 
                value={otp} 
                onChange={setOtp}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} index={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/90">
            Verify Code <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="text-center pt-2">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setShowOTP(false)} 
              className="text-forest"
            >
              Try a different phone number
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PhoneVerification;
