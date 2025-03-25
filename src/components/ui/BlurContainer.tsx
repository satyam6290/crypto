
import { cn } from "@/lib/utils";
import React from "react";

interface BlurContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "light" | "medium" | "heavy";
  className?: string;
}

const BlurContainer = ({ 
  children, 
  intensity = "medium", 
  className, 
  ...props 
}: BlurContainerProps) => {
  const intensityMap = {
    light: "bg-white/40 backdrop-blur-sm",
    medium: "bg-white/60 backdrop-blur-md",
    heavy: "bg-white/80 backdrop-blur-lg"
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 shadow-sm animate-scale-in",
        intensityMap[intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
