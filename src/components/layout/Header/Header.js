import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import Button from '../../common/Button/Button';

import styles from './Header.module.scss';

const Header = ({loadUsers}) => {
  const cookies = new Cookies();
  const loggedUser = cookies.get('username');

  useEffect(() => {
    loadUsers();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {!loggedUser &&
          <Link to='/login'><p>Zaloguj</p></Link>
          }
          {loggedUser &&
          <>
            <Link to={{
              pathname: '/post/myPost',
              state: loggedUser,
            }}
            >
              <p>Moje</p>
            </Link>
            <a href="http://localhost:8000/auth/logout"><p>Wyloguj</p></a>
          </>
          }
          <Link to='/post/add'>
            <Button>
              Dodaj ogłoszenie
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  loadUsers: PropTypes.func,
};

export default Header;
