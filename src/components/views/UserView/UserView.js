import React from 'react';
import {Link, useHistory} from 'react-router-dom';

import PropTypes from 'prop-types';
import styles from './UserView.module.scss';
import {AiFillEdit} from 'react-icons/ai/index';

const UserView = ({allUsers}) => {
  const history = useHistory();
  const loggedUser = history.location.state;
  const currentUser = allUsers.filter(user => user.email === loggedUser.user);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Profil użytkownika</h1>
        {currentUser.map((user,index) => {
          return (
            <div key={index} className={styles.userContainer}>
              <div className={styles.userContainerInner}>
                <img src='/img/user.png' alt='userProfile' />
                <div className={styles.data}>
                  <h3>{user.name}</h3>
                  <div>
                    <p>E-mail: </p>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <p>Uprawnienia: </p>
                    <span>{user.role}</span>
                  </div>
                  <div>
                    <p>Telefon kontaktowy: </p>
                    <span>{user.phone}</span>
                  </div>
                  <div>
                    <p>Miejsce zamieszkania: </p>
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>
              <div className={styles.edit}>
                <Link to={{
                  pathname: `/user/${user._id}`,
                  state: user,
                }}
                >
                  <AiFillEdit />
                  Edytuj ogłoszenie
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

UserView.propTypes = {
  allUsers: PropTypes.array,
};

export default UserView;
