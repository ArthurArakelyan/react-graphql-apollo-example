import { FC } from 'react';

import { ILoaderProps } from './types';

import styles from './Loader.module.scss';

const Loader: FC<ILoaderProps> = ({ size = 'medium', className = '' }) => {
  return (
    <div role="alert" aria-busy="true" className={`${styles['loader-wrapper']} ${styles[`loader-wrapper--${size}`]} ${className}`}>
      <svg className={styles['loader']} viewBox="22 22 44 44">
        <circle className={styles['loader__circle']} cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
      </svg>
    </div>
  );
};

export default Loader;
