import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef(({
  children,
  className = '',
  hover = false,
  ...props
}, ref) => {
  const baseClasses = 'bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden';

  const hoverClasses = hover
    ? 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300'
    : '';

  const classes = cn(baseClasses, hoverClasses, className);

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
