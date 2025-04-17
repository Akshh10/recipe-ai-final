
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="bg-gradient-to-r from-cream/70 to-offwhite py-4 px-4 mb-4 sticky top-0 z-20 shadow-sm backdrop-blur-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <motion.div 
          className="text-xl font-heading font-bold text-forest"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
        >
          Recipe<span className="text-terracotta">AI</span>
        </motion.div>
        
        <motion.button 
          onClick={() => navigate('/profile')}
          className="rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Avatar className="h-9 w-9 border-2 border-terracotta">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="bg-terracotta text-white">U</AvatarFallback>
          </Avatar>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
