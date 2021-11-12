import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

function FlatInputText(props) {
  const {
    className,
    name,
    label,
    type,
    required = false,
    disabled = false,
    placeholder,
    setParentTextValue,
    defaultValue = '',
    value = null,
    autoFocus,
    min,
    max,
  } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  const [textValue, setTextValue] = useState(defaultValue);

  useEffect(() => {
    setParentTextValue && setParentTextValue(textValue);
  }, [textValue]);

  return (
    <div className={classes}>
      {label && (
        <>
          <label htmlFor={name}>{label}</label>
          <span>:</span>
        </>
      )}
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value !== null ? value : textValue}
        placeholder={placeholder}
        onChange={(e) => setTextValue(e.target.value)}
        disabled={disabled}
        autoFocus={autoFocus}
        min={min}
        max={max}
      />
    </div>
  );
}

export default FlatInputText;
