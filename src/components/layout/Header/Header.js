import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = () => (
  <div className={styles.root}>
    <div className={styles.advert}>
      <p>Szukaj, dodawaj, korzystaj - zacznij już dziś</p>
    </div>
    <div className={styles.panel}>
      <div className={styles.logo}>
        <Link to='/'>Share <span>It</span></Link>
      </div>
      <div className={styles.menu}>
        <p>Zaloguj</p>
        <Link to='/post/add'>
          <Button> Dodaj ogłoszenie </Button>
        </Link>
      </div>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
