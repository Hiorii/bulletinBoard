import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import styles from './MyPost.module.scss';

const MyPost = ({allPosts}) => {
  const history = useHistory();
  const currentUser = history.location.state;
  const userPost = allPosts.filter(post=> post.userId.email === currentUser.user);

  return (
    <div className={styles.root}>
      <h1>Moje ogłoszenia</h1>
      {userPost.map((post,index) => {
        return (
          <Link
            to={{
              pathname: `/post/${post.title}`,
              state: post,
            }}
            key={index}
            className={styles.container}
          >
            <div className={styles.postContainer}>
              <div className={styles.image}>
                <img src={post.image} alt={post.title}/>
              </div>
              <div className={styles.title}>
                <p>{post.title}</p>
              </div>
              <div className={styles.data}>
                <p>{post.location} - {post.created}</p>
              </div>
              <div className={styles.price}>
                <p>{post.price} zł</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

MyPost.propTypes = {
  allPosts: PropTypes.array,
};

export default MyPost;
