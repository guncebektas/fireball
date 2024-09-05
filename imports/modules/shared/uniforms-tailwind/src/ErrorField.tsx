// @ts-ignore
import classnames from 'classnames';
import React, {HTMLProps} from 'react';
import {connectField, filterDOMProps, Override} from 'uniforms';

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: any; errorMessage?: string }
>;

function Error({
                 children,
                 className,
                 error,
                 errorMessage,
                 ...props
               }: ErrorFieldProps) {
  return !error ? null : (
    <div className={classnames(
      'bg-red-50',
      'border',
      'border-red-300',
      'text-red-900',
      'p-3',
      'mb-3',
      className
    )} {...filterDOMProps(props)}>
      <div>
        {children || <p className="font-bold">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: 'leaf',
});
