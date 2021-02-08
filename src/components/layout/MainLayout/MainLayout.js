import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/HeaderContainer';
import Alerts from '../../features/Alert/Alert';

import styles from './MainLayout.module.scss';

const Component = ({children}) => (
  <div className={styles.root}>
    <Alerts />
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
