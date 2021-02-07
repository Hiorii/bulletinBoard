import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageUploading from 'react-images-uploading';

import Button from '../../common/Button/Button';

import styles from './PostEdit.module.scss';
import PostShort from '../PostShort/PostShort';

const PostEdit = ({editPost}) => {
  const history = useHistory();
  const currentPost = history.location.state;
  const currentUser = history.location.state.userId;
  const [inputTitle, setTitle] = useState(currentPost.title);
  const [inputText, setText] = useState(currentPost.text);
  const [inputPrice, setPrice] = useState(currentPost.price);
  //const [images, setImages] = useState([]);
  const [post, setPost] = useState({});
  const [date, setDate] = useState('');
  const maxNumber = 1;

  const currentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    setDate(today);
  };

  const editData = (e) => {
    e.preventDefault();
    setPost({
      title: inputTitle,
      text: inputText,
      price: inputPrice,
      created: date,
      updated: date,
      status: 'published',
      image: '/img/website-sell.jpg',
      userId: currentUser._id,
    });
    alert('Post dodany!');
  };

  const pictureLoad = (imageList, addUpdateIndex) => {
    //setImages(imageList);
  };

  useEffect(()=> {
    editPost(currentPost._id, post);
    currentDate();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[post]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edytuj ogłoszenie</h2>
        <div className={styles.formContainer}>
          <div className={styles.data}>
            <form onSubmit={e=>editData(e)}>
              <input
                type="text"
                id="title"
                value={inputTitle}
                placeholder="Nazwa ogłoszenia"
                onChange={e=>setTitle(e.target.value)}
              />
              <input
                type="text"
                id="price"
                value={inputPrice}
                placeholder="Cena"
                onChange={e=>setPrice(e.target.value)}
              />
              <textarea
                type="text"
                id="Treść ogłoszenie"
                value={inputText}
                placeholder="Treść ogłoszenia"
                onChange={e=>setText(e.target.value)}
              />
              <input
                type="file"
                id="image"
                //value={images}
              />
              <div className={styles.btn}>
                <Button className={styles.mainBtn}>
                  <input type="submit" value='Edytuj ogłoszenie'/>
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imageInner}>
              <ImageUploading
                multiple
                //value={images}
                onChange={pictureLoad}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpdate,
                }) => (
                  imageList.length === 0
                    ?
                    <div className={styles.imageWrapper}>
                      <div>
                        <img src={currentPost.image} alt="" />
                        <div className={styles.editBtn}>
                          <button
                            // onClick={() => onImageUpdate()}
                          >
                            Edytuj
                          </button>
                        </div>
                      </div>
                    </div>
                    :
                    <div className={styles.imageWrapper}>
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image.data_url} alt="" />
                          <div className={styles.editBtn}>
                            <button
                              // onClick={() => onImageUpdate(index)}
                            >
                              Edytuj
                            </button>
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

PostEdit.propTypes = {
  editPost: PropTypes.func,
};

export default PostEdit;
