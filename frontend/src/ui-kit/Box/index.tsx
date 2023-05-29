import { ReactNode } from 'react';

import styles from './styles.module.scss';

type BoxProps = {
  children: ReactNode;
  className?: string;
};

const Box = ({ children, className = '' }: BoxProps) => {
  return <div className={`${styles.box} ${className}`}>{children}</div>;
};

export default Box;
