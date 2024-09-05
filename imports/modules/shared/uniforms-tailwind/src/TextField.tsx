import omit from 'lodash/omit';
import React, {Ref} from 'react';
import {connectField, HTMLFieldProps} from 'uniforms';
import wrapField from './wrapField';
// @ts-ignore
import classnames from "classnames";
import {baseInputClasses} from "./baseFormClasses";

export type TextFieldProps = HTMLFieldProps<
  string,
  HTMLInputElement,
  { inputClassName?: string; inputRef?: Ref<HTMLInputElement> }
>;

function Text(props: TextFieldProps) {
  return wrapField(
    omit(
      props,
      ['autoComplete', 'minLength', 'maxLength']),
    <input
      className={classnames(
        ...baseInputClasses,
        {
          'border-red-300': props.error,
          'border-green-300': !props.error && props.changed,
        }
      )}
      autoComplete={props.autoComplete}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      minLength={props.minLength}
      maxLength={props.maxLength}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
    />,
  );
}

export default connectField<TextFieldProps>(Text, {kind: 'leaf'});
