import { InputHTMLAttributes, forwardRef, useState } from 'react';

type InputVariant = 'default' | 'error' | 'success';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      inputSize = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = 'bg-terminal-panel border rounded-lg font-mono text-terminal-text transition-all focus:outline-none';

    const variantStyles = {
      default: 'border-terminal-border focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(245,233,66,0.1)]',
      error: 'border-accent-error focus:border-accent-error focus:shadow-[0_0_0_3px_rgba(255,71,87,0.1)]',
      success: 'border-accent-success focus:border-accent-success focus:shadow-[0_0_0_3px_rgba(0,255,136,0.1)]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-3 text-base',
    };

    const inputClassName = `
      ${baseStyles}
      ${variantStyles[error ? 'error' : variant]}
      ${sizeStyles[inputSize]}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-mono text-terminal-text mb-2 uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClassName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-terminal-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs font-mono text-accent-error flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs font-mono text-terminal-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
