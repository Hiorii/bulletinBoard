import { connect } from 'react-redux';
import { getAllCategories} from '../../../redux/postsRedux';
import Homepage from './Homepage';

const mapStateToProps = state => ({
  allCategories: getAllCategories(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export default connect(mapStateToProps)(Homepage);
