import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | '3d' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  style,
}) => {
  const classes = [
    'vizora-badge',
    `vizora-badge--${variant}`,
    `vizora-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style}>
      {icon && <span className="vizora-badge__icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
