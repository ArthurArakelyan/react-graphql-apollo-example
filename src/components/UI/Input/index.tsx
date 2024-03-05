import { FC } from 'react';

import { IInputProps } from './types.ts';

import styles from './Input.module.scss';

const Input: FC<IInputProps> = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`${styles['input']} ${className}`}
    />
  );
};

export default Input;
