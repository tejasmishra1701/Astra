'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ 
  className, 
  value = 0, 
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-accent-primary',
    success: 'bg-accent-success',
    warning: 'bg-accent-warning',
    error: 'bg-accent-error',
    gradient: 'bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary',
  };

  return (
    <div className="w-full space-y-1">
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs text-terminal-text-secondary">
          <span>{label || 'Progress'}</span>
          <span className="font-mono">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-full bg-terminal-border',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 transition-all duration-500 ease-out',
            variantClasses[variant]
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
