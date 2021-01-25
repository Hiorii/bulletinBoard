import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './PostShort.module.scss';

const PostShort = ({allPosts}) => {
  return (
    <>
      {allPosts.map((post,index) => {
        return (
          <Link
            to={{
              pathname: `/post/${post.title}`,
              state: post,
            }}
            key={index}
            className={styles.root}
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
    </>
  );
};

PostShort.propTypes = {
  allPosts: PropTypes.array,
};

export default PostShort;
