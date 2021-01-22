import React from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

const Component = () => (
  <div className={styles.root}>
    <div className={styles.board}>
      <div className={styles.title}>
        <h1>Kategorie główne</h1>
        <img src='/img/pin.png' alt=""/>
      </div>
      <div className={styles.categories}>
        <div className={styles.category}> Wow</div>
      </div>
    </div>
    <div className={styles.board}>
      <div className={styles.title}>
        <h1>Lista ogłoszeń</h1>
        <img src='/img/pin.png' alt=""/>
      </div>
      <div className={styles.categories}>
        <div className={styles.category}> Wow</div>
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
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
