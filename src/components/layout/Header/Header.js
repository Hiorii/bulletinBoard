import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import {GOOGLE_URL} from '../../../config';
import jwt_decode from 'jwt-decode';

import Button from '../../common/Button/Button';

import styles from './Header.module.scss';

const Header = ({loadUsers}) => {
  const cookies = new Cookies();
  let token = cookies.get('username');
  let loggedUser = token ? jwt_decode(token) : '';

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
          {!token &&
          <Link to='/login'><p>Zaloguj</p></Link>
          }
          {token &&
          <>
            <Link to={{
              pathname: '/post/myPost',
              state: loggedUser,
            }}
            >
              <p>Moje</p>
            </Link>
            <a href={`${GOOGLE_URL}/logout`}><p>Wyloguj</p></a>
          </>
          }
          {token &&
            <Link to='/post/add'>
              <Button>
                Dodaj ogłoszenie
              </Button>
            </Link>
          }
          {!token &&
          <Link to='/login'>
            <Button>
              Dodaj ogłoszenie
            </Button>
          </Link>
          }
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  loadUsers: PropTypes.func,
};

export default Header;
