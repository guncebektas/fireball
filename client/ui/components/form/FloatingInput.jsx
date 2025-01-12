import React, { forwardRef } from 'react';
import { FloatingLabel } from 'flowbite-react';

const FloatingInput = forwardRef((props, ref) => {
  return (
    <FloatingLabel
      {...props}
      variant="standard"
      ref={ref}
      readOnly={false}
      onFocus={(e) => e.target.removeAttribute('readonly')}
    />
  );
});

export default FloatingInput;