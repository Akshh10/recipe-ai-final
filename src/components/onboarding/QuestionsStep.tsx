
import React from 'react';
import { Check } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';

interface QuestionsStepProps {
  step: OnboardingStep;
  currentQuestionIndex: number;
  selectedOptions: Record<number, string>;
  onOptionSelect: (questionIndex: number, option: string) => void;
}

const QuestionsStep = ({ 
  step, 
  currentQuestionIndex, 
  selectedOptions, 
  onOptionSelect 
}: QuestionsStepProps) => {
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
                onClick={() => onOptionSelect(currentQuestionIndex, option)}
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
};

export default QuestionsStep;
