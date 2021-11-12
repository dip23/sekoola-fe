import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

function FlatInputCounter(props) {
  const {
    className,
    name,
    label,
    required = false,
    placeholder,
    defaultValue,
    maxCounter,
    setParentCounter,
  } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  const [counter, setCounter] = useState(defaultValue);

  const _handleMinus = (e) => {
    e.preventDefault();
    if (counter !== 0) setCounter(counter - 1);
  };

  const _handlePlus = (e) => {
    e.preventDefault();
    if (counter !== maxCounter) setCounter(counter + 1);
  };

  useEffect(() => {
    setParentCounter && setParentCounter(counter);
  }, [counter, setParentCounter]);

  return (
    <div className={classes}>
      {label && (
        <>
          <label htmlFor={name}>{label}</label>
          <span>:</span>
        </>
      )}
      <div>
        <button onClick={(e) => _handleMinus(e)}>-</button>
        <input
          type="number"
          name={name}
          id={name}
          required={required}
          value={counter}
          placeholder={placeholder}
          disabled
        />
        <button onClick={(e) => _handlePlus(e)}>+</button>
      </div>
    </div>
  );
}

export default FlatInputCounter;
