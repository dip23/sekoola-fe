import React from 'react';
import styles from './style.module.css';

function FlatInputRadio(props) {
  const {
    className,
    name,
    label,
    inputValues,
    required = false,
    disabled = false,
    setParentCurrentValue,
  } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <>
          <label>{label}</label>
          <span>:</span>
        </>
      )}
      <div>
        {inputValues.length !== 0 ? (
          inputValues.map((inputValue, idx) => (
            <label key={inputValue.id}>
              <input
                type="radio"
                name={name}
                id={name}
                required={required}
                defaultChecked={idx === 0}
                value={inputValue.id}
                onClick={(e) => setParentCurrentValue(parseInt(e.target.value))}
                disabled={disabled}
              />
              {inputValue.name}
            </label>
          ))
        ) : (
          <label>belum ada data</label>
        )}
      </div>
    </div>
  );
}

export default FlatInputRadio;
