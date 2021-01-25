import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';

import Button from '../../common/Button/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';
import {AiFillFileAdd} from 'react-icons/ai';

const PostAdd = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const pictureLoad = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Dodawanie ogłoszenia</h2>
        <div className={styles.formContainer}>
          <div className={styles.data}>
            <form>
              <input
                type="text"
                id="title"
                placeholder="Nazwa ogłoszenia"
              />
              <input
                type="text"
                id="price"
                placeholder="Cena"
              />
              <textarea
                type="text"
                id="Treść ogłoszenie"
                placeholder="Treść ogłoszenia"
              />
              <input
                type="file"
                id="image"
                //value={images}
              />
              <div className={styles.btn}>
                <Button > Dodaj ogłoszenie </Button>
              </div>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageInner}>
              <ImageUploading
                multiple
                value={images}
                onChange={pictureLoad}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  dragProps,
                }) => (
                  images.length === 0
                    ?
                    <div className={styles.imageWrapper}>
                      <h2 className={styles.addPhotoTitle}>Dodaj zdjęcie</h2>
                      <button
                        className={styles.addBtn}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <AiFillFileAdd className={styles.icon}/>
                      </button>
                    </div>
                    :
                    <div className={styles.imageWrapper}>
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image.data_url} alt="" />
                          <div className={styles.editBtn}>
                            <button onClick={() => onImageUpdate(index)}>Edytuj</button>
                            <button onClick={() => onImageRemove(index)}>Usuń</button>
                          </div>
                        </div>
                      ))}
                    </div>
                )}
              </ImageUploading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostAdd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default PostAdd;
