import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './UserEdit.module.scss';
import Button from '../../common/Button/Button';

const UserEdit = ({updateUser}) => {
  const history = useHistory();
  const currentUser = history.location.state;
  const [inputPhone, setInputPhone] = useState(currentUser.phone);
  const [inputLocation, setInputLocation] = useState(currentUser.location);
  const [user, setUser] = useState({});

  const updateData = (e) => {
    e.preventDefault();
    setUser({
      phone: inputPhone,
      location: inputLocation,
    });
    alert('done');
  };

  useEffect(()=> {
    updateUser(currentUser._id, user);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[user]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Profil użytkownika</h1>
        <div className={styles.userContainer}>
          <div className={styles.userContainerInner}>
            <img src='/img/user.png' alt='userProfile' />
            <div className={styles.data}>
              <h3>{currentUser.name}</h3>
              <div>
                <p>E-mail: </p>
                <span>{currentUser.email}</span>
              </div>
              <div>
                <p>Uprawnienia: </p>
                <span>{currentUser.role}</span>
              </div>
              <form onSubmit={e => updateData(e)}>
                <div>
                  <p>Telefon kontaktowy: </p>
                  <input
                    type="text"
                    id="phone"
                    value={inputPhone}
                    placeholder="Numer telefonu"
                    onChange={e=>setInputPhone(e.target.value)}
                  />
                </div>
                <div>
                  <p>Miejsce zamieszkania: </p>
                  <input
                    type="text"
                    id="location"
                    value={inputLocation}
                    placeholder="Miasto zamieszkania"
                    onChange={e=>setInputLocation(e.target.value)}
                  />
                </div>
                <div className={styles.btn}>
                  <Button className={styles.mainBtn}>
                    <input type="submit" value='Zapisz'/>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserEdit.propTypes = {
  updateUser: PropTypes.func,
};

export default UserEdit;
