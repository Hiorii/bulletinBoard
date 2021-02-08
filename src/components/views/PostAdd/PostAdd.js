import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import ImageUploading from 'react-images-uploading';

import Button from '../../common/Button/Button';

import styles from './PostAdd.module.scss';
import {AiFillFileAdd} from 'react-icons/ai';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import {AlertContext} from '../../../data/AlertData';
import jwt_decode from 'jwt-decode';

const PostAdd = ({addNewPost, allUsers}) => {
  const alertCont = useContext(AlertContext);
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [inputTitle, setTitle] = useState('');
  const [inputText, setText] = useState('');
  const [inputPrice, setPrice] = useState(0);
  //const [inputImage, setImage] = useState([]);
  const [post, setPost] = useState({});
  const [date, setDate] = useState('');
  const maxNumber = 1;
  const cookies = new Cookies();
  let token = cookies.get('username');
  let loggedUser = token ? jwt_decode(token) : '';

  const pictureLoad = (imageList, addUpdateIndex) => {
    console.log(imageList[0]);
    setImages(imageList);
  };

  const currentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    setDate(today);
  };

  const dangerAlertShow = (text) => {
    alertCont.dangerAlert(text);
    setTimeout(()=> {
      alertCont.closeAlert();
    },3000);
  };

  const submitPost = (e) => {
    e.preventDefault();
    const currentUser = allUsers.filter(user=> user.email === loggedUser.user);

    if(inputTitle.length === 0) {
      dangerAlertShow('Podaj tytuł ogłoszenia');
    } else if(inputPrice === 0) {
      dangerAlertShow('Podaj cenę ogłoszenia');
    } else if(inputText.length === 0) {
      dangerAlertShow('Podaj treść wiadomości');
    } else if(inputTitle.length < 5) {
      dangerAlertShow('Za krótki tytuł ogloszenia');
    } else if(inputTitle.length > 45) {
      dangerAlertShow('Za długi tytuł ogloszenia');
    } else if(inputPrice < 0) {
      dangerAlertShow('Cena nie może być mniejsza od 0');
    } else if(inputText.length < 10) {
      dangerAlertShow('Za krótka treść ogloszenia');
    } else if(inputText.length > 250) {
      dangerAlertShow('Za długa treść ogloszenia');
    } else {
      setPost({
        title: inputTitle,
        text: inputText,
        price: inputPrice,
        created: date,
        updated: date,
        status: 'published',
        image: '/img/website-sell.jpg',
        userId: currentUser[0]._id,
      });
      alertCont.successAlert('Twoje ogłoszenie zostało dodane');
      setTimeout(()=> {
        history.push('/');
        alertCont.closeAlert();
      },2000);
    }
  };

  useEffect(()=> {
    addNewPost(post);
    currentDate();
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
                type="number"
                id="price"
                placeholder="Cena"
                min="1"
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
                        //onClick={onImageUpload}
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
