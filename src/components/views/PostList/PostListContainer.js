import { connect } from 'react-redux';
import PostList from './PostList';
import {getAll} from '../../../redux/postsRedux';

const mapStateToProps = state => ({
  allPosts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export default connect(mapStateToProps)(PostList);
