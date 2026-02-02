import { HTMLAttributes, forwardRef } from 'react';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      pulse = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-mono font-semibold rounded-md';

    const variantStyles = {
      success: 'bg-accent-success/20 text-accent-success',
      error: 'bg-accent-error/20 text-accent-error',
      warning: 'bg-accent-warning/20 text-accent-warning',
      info: 'bg-accent-primary/20 text-accent-primary',
      default: 'bg-terminal-border text-terminal-text',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-xs',
      lg: 'px-4 py-1.5 text-sm',
    };

    const badgeClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const dotColors = {
      success: 'bg-accent-success',
      error: 'bg-accent-error',
      warning: 'bg-accent-warning',
      info: 'bg-accent-primary',
      default: 'bg-terminal-muted',
    };

    return (
      <span ref={ref} className={badgeClassName} {...props}>
        {dot && (
          <span
            className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} ${
              pulse ? 'animate-pulse' : ''
            }`}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
export { Badge };
