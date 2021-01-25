// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import {getAll} from '../../../redux/userRedux';
import {connect} from 'react-redux';
import Post from './Post';

const mapStateToProps = state => ({
  users: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export default connect(mapStateToProps)(Post);
