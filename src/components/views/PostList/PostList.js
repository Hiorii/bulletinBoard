import React from 'react';
import PropTypes from 'prop-types';

import styles from './PostList.module.scss';

const PostList = ({allPosts}) => {
  return (
    <>
      {allPosts.map((post,index) => {
        return (
          <div key={index} className={styles.root}>
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
          </div>
        );
      })}
    </>
  );
};

PostList.propTypes = {
  allPosts: PropTypes.array,
};

export default PostList;
