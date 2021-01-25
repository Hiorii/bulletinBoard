import {connect} from 'react-redux';
import MyPost from './MyPost';

import { getAll } from '../../../redux/postsRedux';

const mapStateToProps = state => ({
  allPosts: getAll(state),
});

export default connect(mapStateToProps)(MyPost);
