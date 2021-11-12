import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

function FlatDoubleInput(props) {
  const {
    className,
    name,
    label,
    type,
    required = false,
    disabled = false,
    placeholder,
    setParentTextValue,
  } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  const [textValue, setTextValue] = useState({ start: '', end: '' });

  useEffect(() => {
    setParentTextValue && setParentTextValue(textValue);
  }, [textValue, setParentTextValue]);

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
        value={textValue.start}
        placeholder={placeholder}
        onChange={(e) => setTextValue({ ...textValue, start: e.target.value })}
        disabled={disabled}
      />
      <span className={styles.spanText}>sampai</span>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={textValue.end}
        placeholder={placeholder}
        onChange={(e) => setTextValue({ ...textValue, end: e.target.value })}
        disabled={disabled}
      />
    </div>
  );
}

export default FlatDoubleInput;
