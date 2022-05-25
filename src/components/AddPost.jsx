import React, { memo, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { auth, storage } from '../firebase';
import { firestore } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ThemeContext } from '../ThemeContext';
import { themes } from './../ThemeContext';
import firebase from './../firebase';

import { toast } from 'react-toastify';

function AddPost() {
    const [user] = useAuthState(auth);
    const { theme } = useState(ThemeContext);
    const [value, setValue] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSend = async (e) => {
        e.preventDefault();
        const promises = [];
        let uploadTask = null;


        console.log(promises);
        if (images == null || images.length == 0) {
            return toast.warning("Загрузите фото или видео!");
        }

        if (images) {
            setLoading(true);
            for (let i = 0; i < images.length; i++) {

                const storageRef = storage.ref();

                let metadata = {
                    contentType: 'image/jpeg',
                };
                const nameTime = +new Date() + '.jpg'
                uploadTask = storageRef.child('assets/images/' + nameTime).put(images[i], metadata);
                promises.push(
                    uploadTask
                        .then(snapshot =>
                            snapshot.ref.getDownloadURL()
                        )
                )
            }

            const URLs = await Promise.all(promises)
            setLoading(false);

            uploadTask.on("state_changed", (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
                (error) => {
                    switch (error) {
                        case 'storage/unauthorized':
                            console.log('User not authorization');
                            break;
                        case 'storage/cancelled':
                            console.log('Upload was cancelled');
                            break;
                        case 'storage/unknown':
                            console.log(error.message);
                            break;
                    }
                }, () => {
                    firestore.collection('posts').add({
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        text: value,
                        img: URLs
                    })
                    .then((docRef)=>{
                        firestore.collection('posts').doc(docRef.id).update({doc:docRef.id});
                        toast.success('Новый пост добавлен!')
                    })
                });
            setValue('');
            setImages(null);
        }
    }

    return (
        <form className="addPost" onSubmit={onSend}>
            <div className="addPost__title">
                <DriveFileRenameOutlineIcon className="addPost__icon" />
                <p style={{pointerEvents:'none'}}>Создать пост</p>
            </div>
            <div className="addPost__info">
                <Avatar className="addPost__avatar" src={user.photoURL} />
                <textarea placeholder="Описание..." rows="5" cols="45" className={`addPost__input ${theme == themes.dark ? 'is-darkness-container' : ''}`} value={value} onChange={(e) => setValue(e.target.value)} ></textarea>
            </div>
            <div className="addPost__options">
                <div className="addPost__left">
                    <div className="addPost__option">
                        <input type="file" id="option1" onChange={(e) => setImages(e.target.files)} multiple />
                        <label htmlFor="option1"><PhotoIcon className="addPost__icon" style={{ color: '#2563EB' }} /> </label>
                    </div>
                    <div className="addPost__option">
                        <input type="file" id="option2" />
                        <label htmlFor="option2"><GifBoxIcon className="addPost__icon" style={{ color: '#059669' }} /> </label>
                    </div>
                    <div className="addPost__option">
                        <input type="file" id="option3" />
                        <label htmlFor="option3"><SentimentVerySatisfiedIcon className="addPost__icon" style={{ color: '#ff0000' }} /></label>
                    </div>
                </div>
                <div className="addPost__right">
                    {loading ?
                        <button type="submit" disabled>Подождите...</button>
                        :
                        <button type="submit" >Загрузить</button>
                    }
                </div>
            </div>
        </form>
    )
};


export default memo(AddPost)