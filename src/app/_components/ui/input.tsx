"use client";

import * as React from "react";
import { CircleSlashIcon, Eye, EyeOff } from "lucide-react";

import { cn, evaluatePasswordStrength } from "~/lib/utils";
import { Spinner } from "./spinner";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  showStrengthIndicator?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      disabled,
      endIcon,
      isLoading = false,
      showStrengthIndicator = type === "password",
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState<
      0 | 1 | 2 | 3 | 4
    >(0);

    const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const handlePasswordChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const password = event.target.value;
      setPasswordStrength(evaluatePasswordStrength(password));
      props.onChange?.(event);
    };

    const isPasswordType = type === "password";

    // Tip to outset
    // w-[calc(100%+20px)] translate-x-[-10px]

    return (
      <div
        className={cn(
          "focus-w group ring-offset-background border-border relative z-0 flex items-center overflow-hidden rounded-[2px] border-[1px] bg-neutral-50 text-sm ring-neutral-500/25 ring-offset-2 backdrop-blur-sm transition focus-within:border-solid focus-within:border-violet-500 focus-within:bg-violet-500/[10%] focus-within:ring-violet-500 dark:bg-neutral-900",
          disabled && "opacity-80",
          className,
        )}
      >
        {/* Start Icon */}
        {startIcon && (
          <div className="text-muted-foreground group-focus-within:text-foreground pointer-events-none absolute start-2 z-10 flex h-[15px] w-[15px] items-center justify-center opacity-80 group-focus-within:opacity-100">
            {startIcon}
          </div>
        )}

        {/* Input */}
        <input
          type={isPasswordType && isPasswordVisible ? "text" : type}
          disabled={disabled}
          className={cn(
            "placeholder:text-muted-foreground disabled:bg-foreground/10 disabled:text-muted-foreground w-full bg-transparent px-2.5 py-1.5 text-sm tracking-wide normal-case placeholder:text-sm placeholder:focus:outline-none disabled:cursor-not-allowed",
            startIcon && "ps-[32px]", // Adjust padding if startIcon is present
            (endIcon ?? isLoading) && "pe-[32px]", // Adjust padding if endIcon or spinner is present
            isPasswordType && "pe-[32px]",
            showStrengthIndicator && "pe-[92px]",
          )}
          ref={ref}
          {...props}
          onChange={isPasswordType ? handlePasswordChange : props.onChange}
        />

        {/* Password Strength Indicator */}
        {isPasswordType && showStrengthIndicator && (
          <div className="pointer-events-none absolute end-[36px] flex items-center gap-[2px] disabled:opacity-50">
            <span
              className={cn(
                "h-[4px] w-[10px] rounded-sm transition-colors duration-500",
                passwordStrength >= 1 ? "bg-red-500" : "bg-muted-foreground/20",
              )}
            />
            <span
              className={cn(
                "h-[4px] w-[10px] rounded-sm transition-colors duration-500",
                passwordStrength >= 2
                  ? "bg-orange-500"
                  : "bg-muted-foreground/20",
              )}
            />
            <span
              className={cn(
                "h-[4px] w-[10px] rounded-sm transition-colors duration-500",
                passwordStrength >= 3
                  ? "bg-yellow-500"
                  : "bg-muted-foreground/20",
              )}
            />
            <span
              className={cn(
                "h-[4px] w-[10px] rounded-sm transition-colors duration-500",
                passwordStrength >= 4
                  ? "bg-green-500"
                  : "bg-muted-foreground/20",
              )}
            />
          </div>
        )}

        {/* Password Toggle Icon */}
        {!disabled && isPasswordType && !endIcon && !isLoading ? (
          <div
            onClick={handleTogglePasswordVisibility}
            className="text-muted-foreground hover:text-foreground absolute end-2 z-10 flex cursor-pointer items-center"
          >
            {isPasswordVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </div>
        ) : null}

        <div
          className={cn(
            "text-muted-foreground group-focus-within:text-foreground pointer-events-none absolute end-2 flex h-4 w-4 items-center justify-center opacity-80 group-focus-within:opacity-100",
            isLoading && "text-foreground",
          )}
        >
          {isLoading ? (
            <Spinner className="h-[15px] w-[15px] text-violet-500" />
          ) : !isLoading && disabled ? (
            <CircleSlashIcon className="h-4 w-4" />
          ) : (
            endIcon
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
