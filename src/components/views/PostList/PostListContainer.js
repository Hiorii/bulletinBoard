import {connect} from 'react-redux';
import PostList from './PostList';

import { getAll } from '../../../redux/postsRedux';

const mapStateToProps = state => ({
  allPosts: getAll(state),
});

export default connect(mapStateToProps)(PostList);
