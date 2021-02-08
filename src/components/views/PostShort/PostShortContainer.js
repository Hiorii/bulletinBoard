import { connect } from 'react-redux';
import PostShort from './PostShort';
import {getAll, fetchPublished} from '../../../redux/postsRedux';
import {getAllUsers} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  allPosts: getAll(state),
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostShort);
