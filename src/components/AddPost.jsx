import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { auth, storage } from '../firebase';
import {firestore} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { ThemeContext } from '../ThemeContext';
import { themes } from './../ThemeContext';

function AddPost() {
    const [user] = useAuthState(auth);
    const {theme} = useState(ThemeContext);
    const [value, setValue] = useState('');
    const [image, setImage] = useState(null);

    const onSend = (e) => {
        e.preventDefault();
        
        if (!image) {
            return alert('Загрузите фото или видео');
        }

        const storageRef = storage.ref(user.displayName + "/images/" + image.name);
        const task = storageRef.put(image);
        task.on("state_changed", (progress) => { },
            (error) => {
                console.log(error.message);
            }, () => {
                storage.ref(user.displayName + "/images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        firestore.collection('posts').add({
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            text: value,
                            img: url
                        })

                    })
            });
        setValue('');
        setImage(null);
    }

    return (
        <form className="addPost" onSubmit={onSend}>
            <div className="addPost__title">
                <DriveFileRenameOutlineIcon className="addPost__icon" />
                <p>Создать пост</p>
            </div>
            <div className="addPost__info">
                <Avatar className="addPost__avatar" src="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" />
                <textarea placeholder="Описание..." rows="5" cols="45" className={`addPost__input ${theme == themes.dark ? 'is-darkness-container':''}`} value={value} onChange={(e) => setValue(e.target.value)} ></textarea>
            </div>
            <div className="addPost__options">
                <div className="addPost__left">
                    <div className="addPost__option">
                        <input type="file" id="option1" onChange={(e) => setImage(e.target.files[0])} />
                        <label htmlFor="option1"><PhotoIcon className="addPost__icon" style={{color: '#2563EB' }} /> </label>
                    </div>
                    <div className="addPost__option">
                        <input type="file" id="option2" />
                        <label htmlFor="option2"><GifBoxIcon className="addPost__icon" style={{color: '#059669' }} /> </label>
                    </div>
                    <div className="addPost__option">
                        <input type="file" id="option3" />
                        <label htmlFor="option3"><SentimentVerySatisfiedIcon className="addPost__icon" style={{color: '#ff0000' }} /></label>
                    </div>
                </div>
                <div className="addPost__right">
                    <button type="submit">Загрузить</button>
                </div>
            </div>
        </form>
    )
};


export default AddPost
