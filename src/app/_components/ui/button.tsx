"use client";

import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps, MotionValue } from "motion/react";
import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "motion/react";

import { cn } from "~/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-[14px] font-[700] leading-[0] no-underline transition-colors duration-200 focus-visible:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary/85 text-background backdrop-blur-md hover:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground  hover:bg-destructive/90",
        outline:
          "border border-input bg-background/20 backdrop-blur-md hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary/85 text-secondary-foreground  backdrop-blur-md hover:bg-secondary/95",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "leading-1 inline-flex h-auto items-center gap-2 px-0 py-0 text-[length:inherit] text-inherit hover:text-foreground",
        danger:
          "bg-red-500/15 text-red-600 backdrop-blur-md hover:bg-red-500/20 dark:text-red-400",
      },
      size: {
        link: "leading-1 inline-flex h-auto flex-row items-center gap-2 px-0 py-0 text-xs text-inherit hover:text-foreground",
        default: "h-9 px-4 py-2",
        sm: "h-[34px] px-[14px] text-[14px] [&_svg]:size-[16px]",
        lg: "h-10 rounded-[3px] px-4 text-[15px] [&_svg]:size-[22px]",
        icon: "h-8 w-8 [&_svg]:size-4",
        xs: "h-[32px] px-3 py-[8px] text-xs [&_svg]:size-[16px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "sm",
    },
  },
);

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode | MotionValue<number> | MotionValue<string>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      isLoading = false,
      startIcon,
      endIcon,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    const isIconOnly = size === "icon";

    return (
      <motion.button
        whileTap={!props.disabled && !isLoading ? { scale: 0.97 } : undefined}
        className={cn(
          buttonVariants({ variant, size, className }),
          props.disabled && "cursor-not-allowed opacity-75",
          isLoading && "cursor-wait",
        )}
        ref={ref}
        disabled={props.disabled}
        onClick={handleClick}
        {...props}
      >
        {!isIconOnly && !isLoading && startIcon && (
          <span className="flex-shrink-0">{startIcon}</span>
        )}

        {isIconOnly ? (
          isLoading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            (children as React.ReactNode)
          )
        ) : (
          <span className="inline-flex">{children as React.ReactNode}</span>
        )}

        {!isIconOnly && (
          <span className="flex-shrink-0">
            {isLoading ? <Spinner className="h-4 w-4" /> : endIcon}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
