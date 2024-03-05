import { FC } from 'react';

import Button from '../Button';

import { IFetchErrorProps } from './types.ts';

import styles from './FetchError.module.scss';

const FetchError: FC<IFetchErrorProps> = ({ onRetry }) => {
  const handleClick = () => {
    onRetry();
  };

  return (
    <div className={styles['fetch-error']}>
      <p className={styles['fetch-error__message']}>
        Something went wrong!
      </p>

      <Button type="button" onClick={handleClick}>
        Try Again
      </Button>
    </div>
  );
};

export default FetchError;
