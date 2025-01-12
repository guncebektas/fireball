// @ts-ignore
import classnames from 'classnames';
import React from 'react';
import {connectField, HTMLFieldProps} from 'uniforms';

import type {Option} from './types';
import wrapField from './wrapField';
import {baseFieldClasses} from "./baseFormClasses";

const base64: (string: string) => string =
  typeof btoa === 'undefined'
    ? /* istanbul ignore next */ (x) => Buffer.from(x).toString('base64')
    : btoa;
const escape = (x: string) => base64(encodeURIComponent(x)).replace(/=+$/, '');

export type RadioFieldProps = HTMLFieldProps<
  string,
  HTMLDivElement,
  {
    options?: Option<string>[];
    inline?: boolean;
    inputClassName?: string;
  }
>;

function Radio(props: RadioFieldProps) {
  return wrapField(
    props,
    props.options?.map((item) => (
      <div
        key={item.key ?? item.value}
        className={classnames(
          props.inputClassName,
          ...baseFieldClasses, {
            'text-red-500': props.error, // Use text color classes for error styling
            'text-green-500': !props.error && props.changed, // Use text color classes for success styling
            'inline-block': props.inline, // Use 'inline-block' for inline styling
          }
        )}
      >
        <input
          checked={item.value === props.value}
          className="form-radio text-primary-600" // Tailwind CSS class for radio input, text color for default
          disabled={props.disabled}
          id={`${props.id}-${item.key ?? escape(item.value)}`}
          name={props.name}
          onChange={() => {
            if (!props.readOnly) {
              props.onChange(item.value);
            }
          }}
          type="radio"
        />
        <label
          htmlFor={`${props.id}-${item.key ?? escape(item.value)}`}
          className="ml-2" // Added left margin for spacing
        >
          {item.label ?? item.value}
        </label>
      </div>
    ))
  );
}

export default connectField<RadioFieldProps>(Radio, {kind: 'leaf'});
