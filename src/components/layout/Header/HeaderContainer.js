import {connect} from 'react-redux';
import Header from './Header';

import {fetchUsers, getAll} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  users: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  loadUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
