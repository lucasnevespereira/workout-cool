import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Typography } from "@/components/ui/typography";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>{children}</div>;
}

interface LayoutHeaderProps {
  children: ReactNode;
  className?: string;
}

export function LayoutHeader({ children, className }: LayoutHeaderProps) {
  return <div className={cn("mb-8 space-y-2 text-center", className)}>{children}</div>;
}

interface LayoutTitleProps {
  children: ReactNode;
  className?: string;
}

export function LayoutTitle({ children, className }: LayoutTitleProps) {
  return (
    <Typography className={cn("text-2xl font-semibold tracking-tight", className)} variant="h2">
      {children}
    </Typography>
  );
}

interface LayoutDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function LayoutDescription({ children, className }: LayoutDescriptionProps) {
  return (
    <Typography className={cn("text-base text-muted-foreground", className)} variant="muted">
      {children}
    </Typography>
  );
}

interface LayoutContentProps {
  children: ReactNode;
  className?: string;
}

export function LayoutContent({ children, className }: LayoutContentProps) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}
