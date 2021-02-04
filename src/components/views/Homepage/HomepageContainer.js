import { connect } from 'react-redux';
import { getAllCategories } from '../../../redux/postsRedux';

import Homepage from './Homepage';

const mapStateToProps = state => ({
  allCategories: getAllCategories(state),
});
export default connect(mapStateToProps)(Homepage);
