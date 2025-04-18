
import React, { useEffect, useState } from 'react';
import { TextShimmerWave } from './ui/text-shimmer-wave';
import { motion } from 'framer-motion';
import { Card } from './ui/card';

interface TransitionScreenProps {
  onComplete: () => void;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleComplete = typeof onComplete === 'function' ? onComplete : () => {};
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(handleComplete, 500);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-gradient-to-br from-terracotta/90 to-cream/20 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center p-8 max-w-md">
        <TextShimmerWave
          className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white"
          duration={2}
          spread={1.5}
        >
          Creating your perfect dish...
        </TextShimmerWave>
        
        <motion.p 
          className="text-cream text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your culinary journey begins now!
        </motion.p>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="bg-white/10 border-none px-4 py-2 shadow-lg">
            <p className="text-white text-sm">Preparing your personalized experience...</p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransitionScreen;
