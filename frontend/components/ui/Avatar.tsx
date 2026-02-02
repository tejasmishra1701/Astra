import { ImgHTMLAttributes, forwardRef, useState } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: AvatarSize;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      size = 'md',
      fallback,
      status,
      showStatus = false,
      alt = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizeStyles = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-12 h-12 text-sm',
      lg: 'w-16 h-16 text-base',
      xl: 'w-24 h-24 text-xl',
    };

    const statusSizes = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4',
      xl: 'w-5 h-5',
    };

    const statusColors = {
      online: 'bg-accent-success',
      offline: 'bg-terminal-muted',
      away: 'bg-accent-warning',
      busy: 'bg-accent-error',
    };

    const avatarClassName = `
      ${sizeStyles[size]}
      rounded-full
      border-2 border-terminal-border
      object-cover
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const fallbackClassName = `
      ${sizeStyles[size]}
      rounded-full
      border-2 border-terminal-border
      bg-terminal-panel
      flex items-center justify-center
      font-mono font-bold
      text-accent-primary
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const getFallbackText = () => {
      if (fallback) return fallback;
      if (alt) return alt.charAt(0).toUpperCase();
      return '?';
    };

    return (
      <div className="relative inline-block">
        {!imageError && props.src ? (
          <img
            ref={ref}
            alt={alt}
            className={avatarClassName}
            onError={() => setImageError(true)}
            {...props}
          />
        ) : (
          <div className={fallbackClassName}>
            {getFallbackText()}
          </div>
        )}
        {showStatus && status && (
          <span
            className={`
              absolute bottom-0 right-0
              ${statusSizes[size]}
              ${statusColors[status]}
              rounded-full
              border-2 border-terminal-bg
              ${status === 'online' ? 'animate-pulse' : ''}
            `}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
export { Avatar };
