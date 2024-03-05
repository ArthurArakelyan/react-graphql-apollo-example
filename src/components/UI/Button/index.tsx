import { FC } from 'react';

import Loader from '../Loader';

import { IButtonProps } from './types';

import styles from './Button.module.scss';

const Button: FC<IButtonProps> = ({ children, className = '', loading = false, disabled = false, tabIndex, ...props }) => {
  const isDisabled = loading || disabled;

  return (
    <button
      {...props}
      tabIndex={isDisabled ? -1 : (tabIndex || 0)}
      disabled={isDisabled}
      className={`${styles['button']} ${loading ? styles['button--loading'] : ''} ${className}`}
    >
      <div className={styles['button__content']}>
        {children}
      </div>

      {loading && (
        <Loader size="small" className={styles['button__loader']} />
      )}
    </button>
  );
};

export default Button;
