
import React, { useEffect, useState } from 'react';
import { TextShimmer } from './ui/text-shimmer';
import { motion } from 'framer-motion';

interface TransitionScreenProps {
  onComplete: () => void;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Give animation time to complete
    }, 3000);
    
    return () => clearTimeout(timer);
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
      <div className="text-center p-8">
        <TextShimmer>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Ready to Find Your Next Meal
          </h1>
        </TextShimmer>
        <p className="text-offwhite text-lg mt-4 max-w-md mx-auto">
          Discover amazing recipes with the ingredients you already have
        </p>
      </div>
    </motion.div>
  );
};

export default TransitionScreen;
