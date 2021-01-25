import {connect} from 'react-redux';
import Header from './Header';

import {getAll} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  allUsers: getAll(state),
});

export default connect(mapStateToProps)(Header);
