import React from 'react';

const DefaultInput = ({
  type,
  name,
  className,
  id,
  defaultValue,
  onChange,
  spanText
}) => (
  <>
    <input
      type={type}
      name={name}
      className={className}
      id={id}
      defaultValue={defaultValue}
      required
      onChange={onChange}
    />
    <label htmlFor={name}>
      <span>{spanText}</span>
    </label>
  </>
);

export default DefaultInput;
