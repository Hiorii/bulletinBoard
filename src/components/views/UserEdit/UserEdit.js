import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './UserEdit.module.scss';
import {AlertContext} from '../../../data/AlertData';
import {BsFillExclamationCircleFill} from 'react-icons/bs';

const UserEdit = ({updateUser}) => {
  const history = useHistory();
  const alertCont = useContext(AlertContext);
  const currentUser = history.location.state;
  const [inputPhone, setInputPhone] = useState(currentUser.phone);
  const [inputLocation, setInputLocation] = useState(currentUser.location);

  const updateData = (e) => {
    e.preventDefault();
    updateUser(currentUser._id, {
      phone: inputPhone,
      location: inputLocation,
    });
    alertCont.successAlert('Twoje dane zostały zaktualizowane');
    setTimeout(()=> {
      history.push('/');
      history.go(0);
      alertCont.closeAlert();
    },2000);
  };

  useEffect(()=> {
    if(inputPhone.length === 0 || inputLocation.length === 0) {
      alertCont.warningAlert('W celu odblokowania możliwości dodawania ogłoszeń, uzupełnij brakujące dane!');
    } else {
      alertCont.closeAlert();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputPhone, inputLocation]);

  useEffect(()=> {
    return () => {
      alertCont.closeAlert();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
                <div className={styles.formInner}>
                  <p>Telefon kontaktowy: </p>
                  <input
                    type="text"
                    id="phone"
                    value={inputPhone}
                    placeholder="Numer telefonu"
                    onChange={e=>setInputPhone(e.target.value)}
                  />
                  {inputPhone.length === 0 &&
                    <BsFillExclamationCircleFill />
                  }
                </div>
                <div className={styles.formInner}>
                  <p>Miejsce zamieszkania: </p>
                  <input
                    type="text"
                    id="location"
                    value={inputLocation}
                    placeholder="Miasto zamieszkania"
                    onChange={e=>setInputLocation(e.target.value)}
                  />
                  {inputLocation.length === 0 &&
                  <BsFillExclamationCircleFill />
                  }
                </div>
                <div className={styles.btn}>
                  <input type="submit" value='Zapisz'/>
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
