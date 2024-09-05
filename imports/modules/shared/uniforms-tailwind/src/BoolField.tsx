// @ts-ignore
import classnames from 'classnames';
import React, {Ref} from 'react';
import {connectField, HTMLFieldProps} from 'uniforms';
import wrapField from './wrapField';
import {baseFieldClasses, baseTextClasses} from "./baseFormClasses";

export type BoolFieldProps = HTMLFieldProps<
  boolean,
  HTMLDivElement,
  {
    inline?: boolean;
    inputClassName?: string;
    inputRef?: Ref<HTMLInputElement>;
    labelBefore?: string;
  }
>;

function Bool({onChange, ...props}: BoolFieldProps) {
  const {
    disabled,
    error,
    inline,
    inputClassName,
    inputRef,
    label,
    labelBefore,
    name,
    readOnly,
    value,
  } = props;

  return wrapField(
    {...props, label: labelBefore, value: props.value},
    <div
      className={classnames(
        inputClassName,
        baseTextClasses,
        {
          'flex items-center': inline,
        })}
    >
      <input
        checked={value || false}
        className={classnames(
          'form-checkbox',
          ...baseFieldClasses, // Add rounded corners to the checkbox
          {
            'text-red-500': error,
            'text-green-500': !error && props.changed,
            'ml-2': inline,
          }
        )}
        disabled={disabled}
        id={props.id}
        name={name}
        onChange={() => {
          if (!readOnly) {
            onChange(!value);
          }
        }}
        ref={inputRef}
        type="checkbox"
      />
      <label htmlFor={props.id} className={classnames('ml-2', {'mb-2': !inline})}>
        {label}
      </label>
    </div>,
  );
}

export default connectField<BoolFieldProps>(Bool, {kind: 'leaf'});
