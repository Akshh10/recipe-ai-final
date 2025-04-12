
import React, { useState } from 'react';
import { ChefHat, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const Header = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Function to format the date as "Today", "Yesterday", or the actual date
  const formatDateRelative = (date: Date | undefined) => {
    if (!date) return '';
    
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'd MMM yyyy');
    }
  };

  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <ChefHat className="h-6 w-6 text-terracotta mr-2" />
          <h1 className="text-xl font-heading font-bold text-forest">Recipe AI</h1>
        </Link>
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center text-forest hover:text-terracotta transition-colors">
              <span className="mr-1 text-sm font-medium">{formatDateRelative(date)}</span>
              <Calendar className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
