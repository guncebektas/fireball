// @ts-ignore
import classnames from 'classnames';
import React, {HTMLProps} from 'react';
import {filterDOMProps, useForm} from 'uniforms';

export type ErrorsFieldProps = HTMLProps<HTMLDivElement>;

function ErrorsField({children, className, ...props}: ErrorsFieldProps) {
  const {error, schema} = useForm();

  return !error && !children ? null : (
    <div className={classnames(
      'bg-red-50',
      'border',
      'border-red-300',
      'text-red-900',
      'p-3',
      'mb-3',
      'rounded-md',
      className
    )} {...filterDOMProps(props)}>
      <div>
        {children}

        {schema.getErrorMessages(error).map((message, index) => (
          <div key={index} className="font-bold">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ErrorsField;
