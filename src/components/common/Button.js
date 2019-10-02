import React from 'react';

const Button = ({ handleClick, text, classNames, style, disabled }) => (
  <button
    onClick={handleClick}
    className={classNames}
    style={style}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
