import { connect } from 'react-redux';
import UserEdit from './UserEdit';
import {updateUserRequest} from '../../../redux/userRedux';
import {getAllUsers} from '../../../redux/userRedux';

const mapStateToProps = state => ({
  allUsers: getAllUsers(state),
});

const mapDispatchToProps = dispatch => ({
  updateUser: (id, user) => dispatch(updateUserRequest(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
