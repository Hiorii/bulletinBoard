import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/HeaderContainer';

import styles from './MainLayout.module.scss';

const Component = ({children}) => (
  <div className={styles.root}>
    <Header />
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
