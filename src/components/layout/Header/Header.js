import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import {GOOGLE_URL} from '../../../config';
import jwt_decode from 'jwt-decode';

import {BsCardList} from 'react-icons/bs';
import {AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai';
import {FaUserEdit} from 'react-icons/fa';
import Button from '../../common/Button/Button';

import styles from './Header.module.scss';

const Header = ({loadUsers, allUsers}) => {
  const cookies = new Cookies();
  let token = cookies.get('username');
  let loggedUser = token ? jwt_decode(token) : '';
  const currentUser = allUsers.filter(user => user.email === loggedUser.user);

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
          <Link to='/login' className={styles.menuLink}>
            <AiOutlineLogin />
            <p className={styles.menuText}>Zaloguj</p>
          </Link>
          }
          {token &&
          <>
            <Link
              to={{
                pathname: '/post/myPost',
                state: loggedUser,
              }}
              className={styles.menuLink}
            >
              <BsCardList />
              <p className={styles.menuText}>Moje</p>
            </Link>
            <Link
              to={{
                pathname: '/user',
                state: loggedUser,
              }}
              className={styles.menuLink}
            >
              <FaUserEdit />
              <p className={styles.menuText}>User</p>
            </Link>
            <a href={`${GOOGLE_URL}/logout`} className={styles.menuLink}>
              <AiOutlineLogout />
              <p className={styles.menuText}>Wyloguj</p>
            </a>
          </>
          }
          {token && currentUser.every(user => user.location.length > 0 && user.phone.length > 0)
            ?
            <Link to='/post/add'>
              <Button>
                Dodaj ogłoszenie
              </Button>
            </Link>
            :
            currentUser.map((user,index) => {
              return (
                <Link
                  key={index}
                  to={{
                    pathname: `/user/${user._id}`,
                    state: user,
                  }}
                >
                  <Button>
                    Dodaj ogłoszenie
                  </Button>
                </Link>
              );
            })
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
  allUsers: PropTypes.array,
};

export default Header;
