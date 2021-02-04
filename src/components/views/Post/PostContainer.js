import {connect} from 'react-redux';
import {getAll} from '../../../redux/userRedux';

import Post from './Post';

const mapStateToProps = state => ({
  users: getAll(state),
});

export default connect(mapStateToProps)(Post);
