import {connect} from 'react-redux';
import Header from './Header';

import {fetchUsers, getAllUsers} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  loadUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
