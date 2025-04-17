
import React from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const TextShimmer = ({ children, className, ...props }: TextShimmerProps) => {
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-white to-neutral-200 animate-text-shimmer">
        {children}
      </span>
    </div>
  );
};

export { TextShimmer };
