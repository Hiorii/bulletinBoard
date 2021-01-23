import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Homepage.module.scss';
import PostList from '../PostList/PostListContainer';

import VanillaTilt from 'vanilla-tilt';

const Homepage = ({allCategories}) => {
  const inputEl = useRef([]);

  useEffect(() => {
    VanillaTilt.init(inputEl.current, {
      scale: 1.2,
      speed: 1000,
      max: 30,
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.boardsContainer}>
        <div className={styles.boardContainer}>
          <div className={styles.board}>
            <div className={styles.title}>
              <h1>Kategorie główne</h1>
              <img src='/img/pin.png' alt="PinPicture"/>
            </div>
            <div className={styles.categoriesContainer}>
              {allCategories.map((category,index)=> {
                return (
                  <div key={index} className={styles.categories}>
                    <div
                      key={index}
                      className={styles.category}
                      style={{backgroundImage: `url(${category.image})`}}
                      ref={ref => inputEl.current.push(ref)}
                    >
                      <p>{category.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.board}>
          <div className={styles.title}>
            <h1>Lista ogłoszeń</h1>
            <img src='/img/pin.png' alt=""/>
          </div>
          <div className={styles.posts}>
            <PostList />
          </div>
        </div>
        <div className={styles.circleOne}> </div>
        <div className={styles.circleTwo}> </div>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  allCategories: PropTypes.array,
};

export default Homepage;
