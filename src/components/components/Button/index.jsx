import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';


const Button = ({
  children,
  className,
  to,
  type,
  onClick,
  disabled,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
