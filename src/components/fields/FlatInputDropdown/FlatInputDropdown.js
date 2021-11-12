import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

function FlatInputDropdown(props) {
  const {
    className,
    name,
    label,
    options,
    placeholder,
    required = false,
    setParentOptionValue,
    disabled,
  } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  const [optionValue, setOptionValue] = useState('');

  useEffect(() => {
    setParentOptionValue && setParentOptionValue(optionValue);
  }, [optionValue]);

  return (
    <div className={classes}>
      {label && (
        <>
          <label htmlFor={name}>{label}</label>
          <span>:</span>
        </>
      )}
      <select
        id={name}
        name={name}
        required={required}
        onChange={(e) => setOptionValue(e.target.value)}
        defaultValue=""
        disabled={disabled}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options &&
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name || option.nama}
            </option>
          ))}
        {options && options.length === 0 && (
          <option disabled>data kosong</option>
        )}
      </select>
    </div>
  );
}

export default FlatInputDropdown;
