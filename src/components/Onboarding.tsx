import React, { useState } from "react";
import { OnboardingStep } from "@/types/onboarding";
import InfoStep from "./onboarding/InfoStep";
import QuestionsStep from "./onboarding/QuestionsStep";
import HowItWorksStep from "./onboarding/HowItWorksStep";
import ReadyStep from "./onboarding/ReadyStep";
import StepProgress from "./onboarding/StepProgress";
import StepNavigation from "./onboarding/StepNavigation";

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
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        return;
      }
      setCurrentQuestionIndex(0);
    }
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("selectedPlan", selectedPlan);
      localStorage.setItem("cookingPreferences", JSON.stringify(selectedOptions));
      onComplete();
    }
  };

  const handlePrev = () => {
    const step = onboardingSteps[currentStep];
    
    if (step.type === "questions" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      return;
    }
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
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

  const renderCurrentStep = () => {
    const step = onboardingSteps[currentStep];

    switch (step.type) {
      case "info":
        return <InfoStep step={step} />;
      case "questions":
        return (
          <QuestionsStep
            step={step}
            currentQuestionIndex={currentQuestionIndex}
            selectedOptions={selectedOptions}
            onOptionSelect={handleOptionSelect}
          />
        );
      case "howItWorks":
        return <HowItWorksStep step={step} />;
      case "ready":
        return (
          <ReadyStep
            step={step}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
          />
        );
      default:
        return null;
    }
  };

  const showBackButton = currentStep > 0 || 
    (onboardingSteps[currentStep].type === "questions" && currentQuestionIndex > 0);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <StepProgress steps={onboardingSteps.length} currentStep={currentStep} />
          
          <div className="w-full animate-fade-in">
            {renderCurrentStep()}
          </div>

          <StepNavigation
            currentStep={currentStep}
            totalSteps={onboardingSteps.length}
            currentQuestionIndex={
              onboardingSteps[currentStep].type === "questions" ? currentQuestionIndex : undefined
            }
            totalQuestions={
              onboardingSteps[currentStep].type === "questions" 
                ? onboardingSteps[currentStep].questions?.length 
                : undefined
            }
            onNext={handleNext}
            onPrev={handlePrev}
            showBack={showBackButton}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
