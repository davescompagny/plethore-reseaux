import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "light" | "ghost" | "outline";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-bronze text-white hover:bg-bronze-strong",
  dark: "bg-black text-white hover:bg-green",
  light: "bg-white text-black hover:bg-bronze-soft",
  ghost: "bg-transparent text-ink hover:bg-green-soft hover:text-green",
  outline: "bg-transparent border border-line text-ink hover:bg-green-soft hover:text-green hover:border-green",
};

const sizeClasses: Record<Size, string> = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-[0.95rem]",
};

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </Link>
  );
}
