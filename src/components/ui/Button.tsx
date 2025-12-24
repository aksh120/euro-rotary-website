import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-luxury-gold text-luxury-black hover:bg-white hover:text-black border border-transparent shadow-[0_0_15px_rgba(212,175,55,0.3)]",
      secondary:
        "bg-transparent border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black",
      outline:
        "bg-transparent border border-luxury-silver/30 text-luxury-silver hover:border-luxury-ivory hover:text-luxury-ivory",
      ghost: "bg-transparent text-luxury-gold hover:text-white",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs tracking-widest uppercase",
      md: "h-12 px-8 text-sm tracking-widest uppercase",
      lg: "h-14 px-10 text-base tracking-[0.2em] uppercase",
    };

    const MotionBtn = motion.button as any;

    return (
      <MotionBtn
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-bold transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          children
        )}
      </MotionBtn>
    );
  },
);

Button.displayName = "Button";

export { Button };
