import React, { useEffect, useState } from 'react';
import { FlatInputText } from '..';
import styles from './styles.module.css';

export default function TimePickerInput(props) {
  const {
    className,
    disabled,
    label,
    name,
    setParentValue,
    // setParentFirstValue,
    // setParentSecondValue,
  } = props;

  const classes = [styles.root, className].filter(Boolean).join(' ');

  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);

  useEffect(() => {
    setParentValue &&
      setParentValue({ first: firstValue, second: secondValue });
  }, [firstValue, secondValue]);

  return (
    <div className={classes}>
      {label && (
        <>
          <label htmlFor={name}>{label}</label>
          <span>:</span>
        </>
      )}
      <div>
        <FlatInputText
          name="startTime"
          type="time"
          value={firstValue}
          disabled={disabled}
        />
        <p>Sampai</p>
        <FlatInputText
          disabled={disabled}
          name="startTime"
          type="time"
          value={firstValue}
        />
      </div>
    </div>
  );
}
