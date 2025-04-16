
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  currentQuestionIndex?: number;
  totalQuestions?: number;
  onNext: () => void;
  onPrev: () => void;
  showBack: boolean;
}

const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  currentQuestionIndex, 
  totalQuestions,
  onNext, 
  onPrev,
  showBack 
}: StepNavigationProps) => {
  const isQuestionStep = typeof currentQuestionIndex === 'number' && typeof totalQuestions === 'number';
  
  return (
    <div className="w-full flex gap-3">
      {showBack && (
        <Button
          onClick={onPrev}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Back
        </Button>
      )}
      
      <Button
        onClick={onNext}
        className={`bg-terracotta hover:bg-terracotta/90 text-white py-6 ${
          !showBack ? "w-full" : "flex-1"
        }`}
        size="lg"
      >
        {currentStep < totalSteps - 1 ? (
          isQuestionStep && currentQuestionIndex < totalQuestions - 1 ? (
            <>Next Question <ArrowRight className="ml-2 h-5 w-5" /></>
          ) : (
            <>Continue <ArrowRight className="ml-2 h-5 w-5" /></>
          )
        ) : (
          "Get Started"
        )}
      </Button>
    </div>
  );
};

export default StepNavigation;
