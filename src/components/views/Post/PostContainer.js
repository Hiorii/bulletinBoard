import {connect} from 'react-redux';
import {getAll, postById} from '../../../redux/postsRedux';
import {getAllUsers} from '../../../redux/userRedux';

import Post from './Post';

const mapStateToProps = state => ({
  posts: getAll(state),
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (id) => dispatch(postById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
