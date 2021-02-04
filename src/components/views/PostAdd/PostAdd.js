import React, {useState, useEffect} from 'react';
import ImageUploading from 'react-images-uploading';

import Button from '../../common/Button/Button';

import styles from './PostAdd.module.scss';
import {AiFillFileAdd} from 'react-icons/ai';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const PostAdd = ({addNewPost, allUsers}) => {
  const [images, setImages] = useState([]);
  const [inputTitle, setTitle] = useState('');
  const [inputText, setText] = useState('');
  const [inputPrice, setPrice] = useState(0);
  //const [inputImage, setImage] = useState([]);
  const [post, setPost] = useState({});
  const maxNumber = 1;
  const date = new Date();
  const cookies = new Cookies();
  const loggedUser = cookies.get('username');

  const pictureLoad = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const submitPost = (e) => {
    e.preventDefault();
    const currentUser = allUsers.filter(user=> user.email === loggedUser);
    console.log(currentUser[0]._id);
    setPost({
      title: inputTitle,
      text: inputText,
      price: inputPrice,
      created: date.getFullYear() + date.getMonth() + date.getDate(),
      updated: date.getFullYear() + date.getMonth() + date.getDate(),
      status: 'published',
      userId: currentUser[0]._id,
    });
    alert('Post dodany!');
  };

  useEffect(()=> {
    addNewPost(post);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[post]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Dodawanie ogłoszenia</h2>
        <div className={styles.formContainer}>
          <div className={styles.data}>
            <form onSubmit={e=>submitPost(e)}>
              <input
                type="text"
                id="title"
                placeholder="Nazwa ogłoszenia"
                onChange={e=>setTitle(e.target.value)}
              />
              <input
                type="text"
                id="price"
                placeholder="Cena"
                onChange={e=>setPrice(e.target.value)}
              />
              <textarea
                id="Treść ogłoszenie"
                placeholder="Treść ogłoszenia"
                onChange={e=>setText(e.target.value)}
              />
              {/*<input*/}
              {/*  type="file"*/}
              {/*  id="image"*/}
              {/*  //value={images[0].data_url}*/}
              {/*  onChange={e=>setImage(e)}*/}
              {/*/>*/}
              <div className={styles.btn}>
                <Button className={styles.mainBtn}>
                  <input type="submit" value='Dodaj ogłoszenie'/>
                </Button>
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
  addNewPost: PropTypes.func,
  allUsers: PropTypes.array,
};

export default PostAdd;
