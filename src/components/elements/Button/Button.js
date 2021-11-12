import React from 'react';
import style from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button(props) {
  const {
    className,
    type,
    label,
    onClick,
    color,
    blockBtn,
    smallBtn,
    iconBtn,
    disabled,
  } = props;

  // conditional styling (yellow/blue), (blockBtn/not)
  const classesRoot = [
    style.root,
    smallBtn && style.smallBtn,
    blockBtn && style.blockBtn,
    color === 'yellow' ? style.yellow : color === 'blue' ? style.blue : '',
  ].join(' ');

  const classes = [classesRoot, className].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {iconBtn ? <FontAwesomeIcon icon={iconBtn} /> : label}
    </button>
  );
}
