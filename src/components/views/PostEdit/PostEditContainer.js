import { connect } from 'react-redux';
import PostEdit from './PostEdit';
import {updatePostRequest} from '../../../redux/postsRedux';

const mapDispatchToProps = dispatch => ({
  editPost: (id, post) => dispatch(updatePostRequest(id, post)),
});

export default connect(null, mapDispatchToProps)(PostEdit);
