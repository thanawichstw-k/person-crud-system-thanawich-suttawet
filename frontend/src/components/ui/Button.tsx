import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "../../styles/PeoplePage.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "blue" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const variantClass = {
    primary: styles.primaryBtn,
    secondary: styles.secondaryBtn,
    danger: styles.dangerBtn,
    blue: styles.blueBtn,
    ghost: styles.ghostBtn,
  }[variant];

  return (
    <button className={`${styles.buttonBase} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
