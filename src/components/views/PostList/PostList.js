import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './PostList.module.scss';

const PostList = ({allPosts}) => {
  return (
    <div className={styles.root}>
      {allPosts.map((post,index) => {
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

PostList.propTypes = {
  allPosts: PropTypes.array,
};

export default PostList;
