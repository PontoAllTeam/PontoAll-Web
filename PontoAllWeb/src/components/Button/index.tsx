import { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  color?: 'secondary' | 'cancel' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Button({
  label,
  icon,
  iconPosition = 'left',
  color = 'secondary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const colorClasses = {
    secondary: 'bg-secondary hover:bg-accent text-white',
    cancel: 'bg-neutral-light text-text-primary hover:bg-neutral-dark ',
    white: 'bg-white text-text-primary hover:bg-neutral-dark ',
  };

  const sizeClasses = {
    sm: 'px-2 py-2 text-sm',
    md: 'px-8 py-2 text-md',
    lg: 'px-14 py-2 text-md',
    xl: 'px-20 py-2 text-lg',
  };

  return (
    <button
      className={`flex h-fit items-center justify-center rounded-sm transition font-mediun ${
        icon && 'gap-1'
      } ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {iconPosition === 'left' && <span>{icon}</span>}
      <span>{label}</span>
      {iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}
