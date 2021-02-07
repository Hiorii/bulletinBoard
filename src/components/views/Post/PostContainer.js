import {connect} from 'react-redux';
import {getAll} from '../../../redux/postsRedux';
import {postById} from '../../../redux/postsRedux';

import Post from './Post';

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (id) => dispatch(postById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
