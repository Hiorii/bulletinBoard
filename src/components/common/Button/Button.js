import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({children, variant}) => {
  const classes = [];

  if (variant) {
    classes.push(styles[variant]);
  } else {
    classes.push(styles['main']);
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Button;
