import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Homepage.module.scss';
import {BsChevronLeft} from 'react-icons/bs';
import {BsChevronRight} from 'react-icons/bs';

import PostShort from '../PostShort/PostShortContainer';

import VanillaTilt from 'vanilla-tilt';
import Button from '../../common/Button/Button';

const Homepage = ({allCategories}) => {
  const inputEl = useRef([]);
  const navigation = useRef(null);
  const arrowNavigation = (scrollOffset) => {
    navigation.current.scrollLeft += scrollOffset;
  };

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
              <img src="/img/pin.png" alt="PinPicture"/>
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
            <h1>Wyróżnione ogłoszenia</h1>
            <img src='/img/pin.png' alt=""/>
          </div>
          <div className={styles.posts} ref={navigation}>
            <div
              className={styles.left}
              onClick={()=>arrowNavigation(-288)}
            >
              <BsChevronLeft />
            </div>
            <PostShort />
            <div
              className={styles.right}
              onClick={()=>arrowNavigation(288)}
            >
              <BsChevronRight />
            </div>
          </div>
          <Link to='/post/list'>
            <div className={styles.btnAll}>
              <Button>Zobacz wszytskie</Button>
            </div>
          </Link>
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
