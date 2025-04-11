
import React, { useState } from "react";
import { ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Recipe AI",
    description: "Discover delicious recipes based on ingredients you already have at home.",
    image: "/placeholder.svg"
  },
  {
    title: "Add Your Ingredients",
    description: "Simply type the ingredients you have and let Recipe AI work its magic.",
    image: "/placeholder.svg"
  },
  {
    title: "Discover Recipes",
    description: "Browse through personalized recipe recommendations that match your ingredients.",
    image: "/placeholder.svg"
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Progress indicator */}
          <div className="flex gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full w-16 ${
                  index <= currentStep ? "bg-terracotta" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="mb-8 bg-cream/50 p-6 rounded-full">
            <ChefHat className="h-12 w-12 text-terracotta" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {onboardingSteps[currentStep].title}
            </h2>
            <p className="text-forest/80">
              {onboardingSteps[currentStep].description}
            </p>
          </div>

          <div className="w-full h-56 bg-gray-100 rounded-lg mb-12 overflow-hidden flex items-center justify-center">
            <img 
              src={onboardingSteps[currentStep].image} 
              alt={onboardingSteps[currentStep].title}
              className="object-cover w-full h-full"
            />
          </div>

          <Button
            onClick={handleNext}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white py-6"
            size="lg"
          >
            {currentStep < onboardingSteps.length - 1 ? (
              <>Continue <ArrowRight className="ml-2 h-5 w-5" /></>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
