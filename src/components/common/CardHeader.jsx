import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const CardHeader = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-6 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export default CardHeader;
