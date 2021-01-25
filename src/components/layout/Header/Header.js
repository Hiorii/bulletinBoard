import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';

import styles from './Header.module.scss';

const Header = ({allUsers}) => {
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(()=> {
    const currentUser = allUsers.filter(user=> user.isLogged === true);
    setLoggedUser(currentUser);
  },[allUsers]);

  return (
    <div className={styles.root}>
      <div className={styles.advert}>
        <p>Szukaj, dodawaj, korzystaj - zacznij już dziś</p>
      </div>
      <div className={styles.panel}>
        <div className={styles.logo}>
          <Link to='/'>Share <span>It</span></Link>
        </div>
        <div className={styles.menu}>
          {loggedUser.length === 0 &&
            <a href="https://www.google.com/"><p>Zaloguj</p></a>
          }
          {loggedUser.length !== 0 &&
          <>
            <Link to={{
              pathname: '/post/myPost',
              state: loggedUser,
            }}
            >
              <p>Moje</p>
            </Link>
            <a href="https://www.google.com/"><p>Wyloguj</p></a>
          </>
          }
          <Link to='/post/add'>
            <Button> Dodaj ogłoszenie </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  allUsers: PropTypes.array,
};

export default Header;
