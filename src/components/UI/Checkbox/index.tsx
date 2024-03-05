import { FC, MouseEventHandler } from 'react';

import { ICheckboxProps } from './types';

import styles from './Checkbox.module.scss';

const Checkbox: FC<ICheckboxProps> = ({ value = false, onChange = () => {}, label = '', disabled = false, className = '', onClick, ...props }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClick) {
      onClick(e);
    }

    onChange(!value);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={value}
      aria-label={label}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      className={`${styles['checkbox']} ${className}`}
      onClick={handleClick}
      {...props}
    >
      <svg className={styles['checkbox__mark']} aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width="16px" height="16px">
        <path d="M378 815q-9 0-17.5-3.5T345 801L164 620q-14-14-14-34t14-34q14-14 33.5-14t34.5 14l146 146 350-349q14-14 33.5-14.5T795 349q14 14 14 34t-14 34L411 801q-7 7-15.5 10.5T378 815Z"/>
      </svg>
    </button>
  );
};

export default Checkbox;
