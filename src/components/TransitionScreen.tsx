
import React, { useEffect, useState } from 'react';
import { TextShimmer } from './ui/text-shimmer';
import { motion } from 'framer-motion';
import { Card } from './ui/card';

interface TransitionScreenProps {
  onComplete: () => void;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  
  const textOptions = [
    "Ready to Find Your Next Meal",
    "Turning Ingredients into Delicious Meals",
    "Your Personal Recipe Assistant"
  ];
  
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 1500);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Give animation time to complete
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-forest flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center p-8 max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TextShimmer>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {textOptions[currentText]}
            </h1>
          </TextShimmer>
        </motion.div>
        
        <motion.p 
          className="text-offwhite text-lg mt-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover amazing recipes with the ingredients you already have
        </motion.p>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-terracotta/20 border-none px-4 py-2 shadow-lg">
            <p className="text-offwhite text-sm">Preparing your personalized experience...</p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransitionScreen;
