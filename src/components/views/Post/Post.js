import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import styles from './Post.module.scss';

const Post = ({fetchPost}) => {
  let history = useHistory();
  const currentPost = history.location.state;
  const cookies = new Cookies();
  const loggedUser = cookies.get('username');
  useEffect(()=> {
    fetchPost(currentPost._id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <p>{currentPost.title}</p>
            <p>{currentPost.price} zł</p>
          </div>
          {loggedUser === currentPost.userId.email &&
          <div className={styles.edit}>
            <Link to={{
              pathname: `/post/${currentPost._id}/edit`,
              state: currentPost,
            }}
            >
              Edytuj ogłoszenie
            </Link>
          </div>
          }
        </div>
        <div className={styles.data}>
          <div className={styles.imgContainer}>
            <img src={currentPost.image} alt={currentPost.title}/>
          </div>
          <div className={styles.info}>
            <div>
              <p>Data publikacji: </p>
              <span>{currentPost.created.slice(0,10)}</span>
            </div>
            <div>
              <p>Lokalizacja: </p>
              <span>{currentPost.location}</span>
            </div>
            <div>
              <p>Tel. kontaktowy: </p>
              <span>{currentPost.phone}</span>
            </div>
            <div>
              <p>Email: </p>
              <span>{currentPost.email}</span>
            </div>
            <div>
              <p>Status: </p>
              <span>{currentPost.status}</span>
            </div>
          </div>
        </div>
        <div className={styles.desc}>
          <h2>Opis ogłoszenia</h2>
          <p>{currentPost.text}</p>
        </div>
      </div>
      <div className={styles.circleOne}> </div>
      <div className={styles.circleTwo}> </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.array,
  fetchPost: PropTypes.func,
};

export default Post;
