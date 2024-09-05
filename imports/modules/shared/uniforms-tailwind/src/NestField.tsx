import classnames from 'classnames';
import React from 'react';
import {connectField, filterDOMProps, HTMLFieldProps} from 'uniforms';

import AutoField from './AutoField';

export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { itemProps?: object }
>;

function Nest({
                children,
                className,
                error,
                errorMessage,
                fields,
                itemProps,
                label,
                showInlineError,
                ...props
              }: NestFieldProps) {
  return (
    <div
      className={classnames(
        className, {
          'border-red-300': error
        })}
      {...filterDOMProps(props)}
    >
      {label && <label className="text-sm font-medium text-gray-500">{label}</label>}

      {!!(error && showInlineError) && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}

      {children ||
        fields.map((field) => (
          <AutoField key={field} name={field} {...itemProps} />
        ))}
    </div>
  );
}

export default connectField<NestFieldProps>(Nest);
