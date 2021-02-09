import { connect } from 'react-redux';
import PostShort from './PostShort';
import {getAll, fetchPublished} from '../../../redux/postsRedux';

const mapStateToProps = state => ({
  allPosts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostShort);
