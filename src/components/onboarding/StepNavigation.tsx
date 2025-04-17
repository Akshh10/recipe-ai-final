
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

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
    <motion.div 
      className="w-full flex gap-3 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {showBack && (
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1"
        >
          <Button
            onClick={onPrev}
            variant="outline"
            className="w-full border-forest/20 text-forest hover:bg-forest/5"
            size="lg"
          >
            Back
          </Button>
        </motion.div>
      )}
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={!showBack ? "w-full" : "flex-1"}
      >
        <Button
          onClick={onNext}
          className={`bg-terracotta hover:bg-terracotta/90 text-white py-6 w-full shadow-md hover:shadow-lg transition-all`}
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
      </motion.div>
    </motion.div>
  );
};

export default StepNavigation;
