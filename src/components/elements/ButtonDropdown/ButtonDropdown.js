import React, { useState } from 'react';
import style from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Button({
  className,
  label,
  dataDropdown,
  color,
  blockBtn,
  smallBtn,
  iconBtn,
}) {
  // conditional styling (yellow/blue), (blockBtn/not)
  const classesRoot = [
    style.button,
    smallBtn && style.smallBtn,
    blockBtn && style.blockBtn,
    color === 'yellow' ? style.yellow : color === 'blue' ? style.blue : '',
  ].join(' ');

  const [showDropdown, setshowDropdown] = useState(false);

  const classes = [classesRoot, className].filter(Boolean).join(' ');

  const handleClickDropdown = () => {
    if (!showDropdown) {
      setshowDropdown(true);
    } else {
      setshowDropdown(false);
    }
  };

  return (
    <div className={style.root}>
      <button className={classes} onClick={handleClickDropdown}>
        {iconBtn ? <FontAwesomeIcon icon={iconBtn} /> : label}
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {showDropdown && (
        <div>
          {dataDropdown &&
            dataDropdown.map((i, idx) => (
              <div
                key={idx}
                onClick={() => i.handleClickItem && i.handleClickItem()}
              >
                {i.value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
