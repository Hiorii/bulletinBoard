import { connect } from 'react-redux';
import PostAdd from './PostAdd';
import {addPostRequest} from '../../../redux/postsRedux';
import {getAllUsers} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  addNewPost: (post) => dispatch(addPostRequest(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);
