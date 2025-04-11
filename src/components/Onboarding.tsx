
import React, { useState } from "react";
import { ChefHat, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
  type: "info" | "questions" | "howItWorks" | "ready";
  questions?: {
    question: string;
    options: string[];
  }[];
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
    title: "Welcome to Recipe AI!",
    description: "Find amazing Indian meals hiding in your own kitchen. Cook more, waste less.",
    image: "/placeholder.svg",
    type: "info"
  },
  {
    title: "Tell Us a Little About Your Cooking? (Optional)",
    description: "This helps us suggest recipes you might love!",
    type: "questions",
    questions: [
      {
        question: "How much time do you usually have for cooking?",
        options: ["Quick (Under 30 mins)", "Moderate (30-60 mins)", "Leisurely (60+ mins)"]
      },
      {
        question: "What's your go-to meal style?",
        options: ["Veg Comfort Food", "Quick Non-Veg", "Healthy & Light", "Explore New Things"]
      },
      {
        question: "What's your main goal with Recipe AI?",
        options: ["Use Up Ingredients", "Find Quick Meals", "Try New Recipes", "Eat Healthier"]
      }
    ]
  },
  {
    title: "List Your Ingredients, Find Your Meal!",
    description: "Just type what's in your kitchen, and we'll instantly show you the delicious Indian dishes you can create.",
    type: "howItWorks"
  },
  {
    title: "Your Next Meal Awaits!",
    description: "Let's turn those ingredients into something amazing. Sign up or log in to save preferences and recipes (optional).",
    type: "ready",
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
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [selectedPlan, setSelectedPlan] = useState<string>("Free");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleNext = () => {
    const step = onboardingSteps[currentStep];
    
    if (step.type === "questions") {
      if (currentQuestionIndex < step.questions!.length - 1) {
        // Move to next question within the same step
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        return;
      }
      // Reset question index when moving to next step
      setCurrentQuestionIndex(0);
    }
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // In a real app, we would save the selection and plan
      localStorage.setItem("selectedPlan", selectedPlan);
      localStorage.setItem("cookingPreferences", JSON.stringify(selectedOptions));
      onComplete();
    }
  };

  const handlePrev = () => {
    const step = onboardingSteps[currentStep];
    
    if (step.type === "questions" && currentQuestionIndex > 0) {
      // Move to previous question within the same step
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      return;
    }
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      // If moving back to questions step, set to the last question
      const prevStep = onboardingSteps[currentStep - 1];
      if (prevStep.type === "questions") {
        setCurrentQuestionIndex(prevStep.questions!.length - 1);
      }
    }
  };

  const handleOptionSelect = (questionIndex: number, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];

    if (step.type === "info") {
      return (
        <>
          <div className="mb-8 bg-cream/50 p-6 rounded-full">
            <ChefHat className="h-12 w-12 text-terracotta" />
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

    if (step.type === "questions") {
      const currentQuestion = step.questions![currentQuestionIndex];
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80 mb-6">
              {step.description}
            </p>
          </div>

          <div className="w-full mb-10">
            {/* Show only the current question */}
            <div className="mb-6 animate-fade-in">
              <p className="font-medium mb-3 text-forest text-center">
                {currentQuestion.question} 
                <span className="text-sm text-gray-400 ml-2">
                  ({currentQuestionIndex + 1}/{step.questions!.length})
                </span>
              </p>
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    className={`w-full p-3 rounded-lg border flex items-center justify-between ${
                      selectedOptions[currentQuestionIndex] === option 
                        ? "border-terracotta bg-terracotta/10" 
                        : "border-gray-200"
                    }`}
                    onClick={() => handleOptionSelect(currentQuestionIndex, option)}
                  >
                    <span>{option}</span>
                    {selectedOptions[currentQuestionIndex] === option && (
                      <Check className="h-4 w-4 text-terracotta" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    if (step.type === "howItWorks") {
      return (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80 mb-6">
              {step.description}
            </p>
          </div>

          <div className="w-full h-56 bg-cream/30 rounded-lg mb-12 p-4">
            <div className="animate-pulse flex flex-col items-center">
              <div className="flex gap-2 mb-6">
                <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Paneer</span>
                <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Onion</span>
                <span className="bg-terracotta/80 text-white px-3 py-1 rounded-full text-sm">Capsicum</span>
              </div>
              
              <div className="w-full max-w-xs bg-white p-3 rounded-lg shadow-sm mb-3 flex">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="ml-3">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="w-full max-w-xs bg-white p-3 rounded-lg shadow-sm flex">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="ml-3">
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (step.type === "ready") {
      return (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-bold text-forest mb-4">
              {step.title}
            </h2>
            <p className="text-forest/80 mb-2">
              {step.description}
            </p>
          </div>

          <div className="w-full mb-6">
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
                className={`h-1 rounded-full w-10 ${
                  index < currentStep ? "bg-terracotta" : 
                  index === currentStep ? "bg-terracotta" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="w-full animate-fade-in">
            {renderStepContent()}
          </div>

          <div className="w-full flex gap-3">
            {(currentStep > 0 || (onboardingSteps[currentStep].type === "questions" && currentQuestionIndex > 0)) && (
              <Button
                onClick={handlePrev}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Back
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              className={`bg-terracotta hover:bg-terracotta/90 text-white py-6 ${
                currentStep === 0 || (onboardingSteps[currentStep].type === "questions" && currentQuestionIndex === 0 && !currentStep) 
                ? "w-full" : "flex-1"
              }`}
              size="lg"
            >
              {currentStep < onboardingSteps.length - 1 ? (
                onboardingSteps[currentStep].type === "questions" && 
                currentQuestionIndex < onboardingSteps[currentStep].questions!.length - 1 ? (
                  <>Next Question <ArrowRight className="ml-2 h-5 w-5" /></>
                ) : (
                  <>Continue <ArrowRight className="ml-2 h-5 w-5" /></>
                )
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
