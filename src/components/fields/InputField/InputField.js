import React, { useState } from 'react';
import styles from './style.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function InputField(props) {
  const {
    className,
    disabled,
    type,
    name,
    label,
    placeholder,
    required = false,
    value,
    onChange,
    smallField,
  } = props;
  const classes = [styles.root, smallField && styles.smallField, className]
    .filter(Boolean)
    .join(' ');

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <input
        type={
          type === 'password' ? (passwordShown ? 'text' : 'password') : type
        }
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {type === 'password' && (
        <i>
          {passwordShown ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              onClick={togglePasswordVisiblity}
            />
          ) : (
            <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisiblity} />
          )}
        </i>
      )}
    </div>
  );
}
