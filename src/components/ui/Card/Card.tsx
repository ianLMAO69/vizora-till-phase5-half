import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  as?: 'div' | 'article' | 'section' | 'aside';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  as = 'div',
  ...props
}) => {
  const classes = [
    'vizora-card',
    `vizora-card--${variant}`,
    `vizora-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'article') {
    return (
      <article className={classes} {...props}>
        {children}
      </article>
    );
  }

  if (as === 'section') {
    return (
      <section className={classes} {...props}>
        {children}
      </section>
    );
  }

  if (as === 'aside') {
    return (
      <aside className={classes} {...props}>
        {children}
      </aside>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
