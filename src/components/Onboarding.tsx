
import React, { useState } from "react";
import { OnboardingStep } from "@/types/onboarding";
import { motion, AnimatePresence } from "framer-motion";
import InfoStep from "./onboarding/InfoStep";
import QuestionsStep from "./onboarding/QuestionsStep";
import HowItWorksStep from "./onboarding/HowItWorksStep";
import ReadyStep from "./onboarding/ReadyStep";
import AuthStep from "./onboarding/AuthStep";
import StepProgress from "./onboarding/StepProgress";
import StepNavigation from "./onboarding/StepNavigation";

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Recipe AI!",
    description: "Find amazing Indian meals hiding in your own kitchen. Cook more, waste less.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
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
    title: "Create your account",
    description: "Let's set up your profile to save your preferences and favorite recipes.",
    type: "auth"
  },
  {
    title: "Choose Your Meal Journey",
    description: "Subscribe to unlock more delicious recipes and personalized meal suggestions.",
    type: "ready",
    plans: [
      {
        name: "Free",
        price: "₹0",
        interval: "forever",
        features: ["Basic recipe search", "1 meal option per ingredient", "Save up to 3 favorites"]
      },
      {
        name: "Weekly",
        price: "₹169",
        interval: "week",
        recommended: true,
        discount: "20% off",
        features: ["Unlimited recipe search", "Unlimited favorites", "Detailed nutritional info", "Weekly meal planner"]
      },
      {
        name: "Quarterly",
        price: "₹449",
        interval: "3 months",
        discount: "30% off",
        features: ["All Weekly plan features", "Ingredient substitutions", "No ads"]
      },
      {
        name: "Annual",
        price: "₹1299",
        interval: "year",
        discount: "40% off",
        features: ["All Quarterly features", "Priority customer support", "Early access to new features"]
      }
    ]
  }
];

interface OnboardingProps {
  onComplete: () => void;
  onShowAuth: (type: "login" | "signup") => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onShowAuth }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [selectedPlan, setSelectedPlan] = useState<string>("Free");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleNext = () => {
    const step = onboardingSteps[currentStep];
    setDirection("forward");
    
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
      localStorage.setItem("onboardingComplete", "true");
      onComplete();
    }
  };

  const handlePrev = () => {
    const step = onboardingSteps[currentStep];
    setDirection("backward");
    
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
      case "auth":
        return <AuthStep step={step} onShowAuth={onShowAuth} />;
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

  const slideVariants = {
    enterForward: {
      x: 300,
      opacity: 0,
    },
    enterBackward: {
      x: -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exitForward: {
      x: -300,
      opacity: 0,
    },
    exitBackward: {
      x: 300,
      opacity: 0,
    },
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-offwhite via-soft-purple/10 to-cream/20 flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <StepProgress steps={onboardingSteps.length} currentStep={currentStep} />
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={`${currentStep}-${currentQuestionIndex}`}
              className="w-full"
              custom={direction}
              variants={slideVariants}
              initial={direction === "forward" ? "enterForward" : "enterBackward"}
              animate="center"
              exit={direction === "forward" ? "exitForward" : "exitBackward"}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>

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
            skipEnabled={onboardingSteps[currentStep].type === "auth"}
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
