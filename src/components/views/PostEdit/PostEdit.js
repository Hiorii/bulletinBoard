import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import ImageUploading from 'react-images-uploading';

import Button from '../../common/Button/Button';

import styles from './PostEdit.module.scss';

const PostEdit = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const history = useHistory();
  const currentPost = history.location.state;

  const editData = () => {

  };

  const pictureLoad = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  console.log(currentPost);
  console.log(images);
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Edytuj ogłoszenie</h2>
        <div className={styles.formContainer}>
          <div className={styles.data}>
            <form onSubmit={editData}>
              <input
                type="text"
                id="title"
                value={currentPost.title}
                placeholder="Nazwa ogłoszenia"
              />
              <input
                type="text"
                id="price"
                value={currentPost.price}
                placeholder="Cena"
              />
              <textarea
                type="text"
                id="Treść ogłoszenie"
                value={currentPost.text}
                placeholder="Treść ogłoszenia"
              />
              <input
                type="file"
                id="image"
                //value={images}
              />
              <div className={styles.btn}>
                <Button> Dodaj ogłoszenie </Button>
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
                  onImageUpdate,
                }) => (
                  images.length === 0
                    ?
                    <div className={styles.imageWrapper}>
                      <div>
                        <img src={currentPost.image} alt="" />
                        <div className={styles.editBtn}>
                          <button onClick={() => onImageUpdate()}>Edytuj</button>
                        </div>
                      </div>
                    </div>
                    :
                    <div className={styles.imageWrapper}>
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image.data_url} alt="" />
                          <div className={styles.editBtn}>
                            <button onClick={() => onImageUpdate(index)}>Edytuj</button>
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

export default PostEdit;
