
import React, { useState } from "react";
import { ChefHat, ArrowRight, Camera, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  type: "info" | "question" | "plan";
  options?: string[];
  plans?: {
    name: string;
    price: string;
    interval: string;
    features: string[];
    recommended?: boolean;
  }[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Recipe AI",
    description: "Discover delicious recipes based on ingredients you already have at home.",
    image: "/placeholder.svg",
    type: "info"
  },
  {
    title: "Scan or Add Ingredients",
    description: "Quickly scan your ingredients with your camera or add them manually to find matching recipes.",
    type: "info"
  },
  {
    title: "What do you cook most often?",
    description: "This helps us personalize your recipe suggestions.",
    type: "question",
    options: ["Indian cuisine", "Continental", "Asian", "Mediterranean", "Other"]
  },
  {
    title: "Choose Your Plan",
    description: "Start with our free plan or upgrade for premium features",
    type: "plan",
    plans: [
      {
        name: "Free",
        price: "₹0",
        interval: "forever",
        features: ["Basic recipe search", "Save up to 5 favorites", "Standard recipe view"]
      },
      {
        name: "Premium",
        price: "₹149",
        interval: "month",
        recommended: true,
        features: ["Unlimited recipe search", "Unlimited favorites", "Detailed nutritional info", "Ingredient substitutions", "No ads"]
      },
      {
        name: "Annual",
        price: "₹999",
        interval: "year",
        features: ["All Premium features", "Save ₹789 per year", "Priority updates"]
      }
    ]
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("Free");

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // In a real app, we would save the selection and plan
      localStorage.setItem("selectedCuisine", selectedOption);
      localStorage.setItem("selectedPlan", selectedPlan);
      onComplete();
    }
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];

    if (step.type === "info") {
      return (
        <>
          <div className="mb-8 bg-cream/50 p-6 rounded-full">
            {currentStep === 0 ? (
              <ChefHat className="h-12 w-12 text-terracotta" />
            ) : (
              <Camera className="h-12 w-12 text-terracotta" />
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80">
              {step.description}
            </p>
          </div>

          {step.image && (
            <div className="w-full h-56 bg-gray-100 rounded-lg mb-12 overflow-hidden flex items-center justify-center">
              <img 
                src={step.image} 
                alt={step.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </>
      );
    }

    if (step.type === "question") {
      return (
        <>
          <div className="mb-8 bg-cream/50 p-6 rounded-full">
            <Search className="h-12 w-12 text-terracotta" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80 mb-6">
              {step.description}
            </p>
          </div>

          <div className="w-full mb-12">
            {step.options?.map((option) => (
              <button
                key={option}
                className={`w-full p-4 mb-3 rounded-lg border text-left ${
                  selectedOption === option 
                    ? "border-terracotta bg-terracotta/10" 
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      );
    }

    if (step.type === "plan") {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80 mb-2">
              {step.description}
            </p>
          </div>

          <div className="w-full mb-10">
            {step.plans?.map((plan) => (
              <div 
                key={plan.name}
                className={`w-full p-4 mb-3 rounded-lg border relative ${
                  selectedPlan === plan.name 
                    ? "border-terracotta bg-terracotta/10" 
                    : "border-gray-200"
                } ${plan.recommended ? "border-2" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-terracotta text-white text-xs py-1 px-2 rounded">
                    Recommended
                  </div>
                )}
                <div className="flex items-center" onClick={() => setSelectedPlan(plan.name)}>
                  <div className="mr-2 h-5 w-5 border rounded-full flex items-center justify-center">
                    {selectedPlan === plan.name && (
                      <div className="h-3 w-3 rounded-full bg-terracotta"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{plan.name}</h3>
                    <div className="flex items-baseline mt-1">
                      <span className="text-lg font-bold">{plan.price}</span>
                      <span className="text-xs ml-1">/{plan.interval}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pl-7">
                  <ul className="text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mb-1 flex items-center">
                        <div className="h-1 w-1 bg-terracotta rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }

    return null;
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

          {renderStepContent()}

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
