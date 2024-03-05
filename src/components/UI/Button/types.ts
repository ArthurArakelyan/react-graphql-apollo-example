import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface IButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
