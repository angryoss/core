import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function evaluatePasswordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (password.length < 8) return 0; // Too short

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password); // Explicitly list special characters

  const conditionsMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
    Boolean,
  ).length;

  // Assign strength levels
  if (conditionsMet === 1) return 1; // Red: Very Weak
  if (conditionsMet === 2) return 2; // Orange: Weak
  if (conditionsMet === 3) return 3; // Yellow: Medium
  if (conditionsMet >= 4) return 4; // Green: Strong

  return 0; // Default fallback
}
