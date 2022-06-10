import React, { memo, useState } from 'react';
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
import Picker from 'emoji-picker-react';
import { useLoading } from './../hooks/useLoading';


function AddPost() {
    const [user] = useAuthState(auth);
    const { theme } = useState(ThemeContext);
    const [value, setValue] = useState('');
    const [images, setImages] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [showSmile, setShowSmile] = useState(false);
    const { loading, setLoading } = useLoading();

    const onHandleChangeImage = (files) => {
        setPreviewImg([]);

        for (let i = 0; i < files.length; i++) {
            if (files[i]?.type.indexOf('image') === -1) {
                setImages([]);
                return toast.error('Только изображения!')
            }
        }

        for (let j = 0, f; f = files[j]; j++) {
            const FReader = new FileReader();

            FReader.onload = (function (theFile) {
                return function (e) {
                    setPreviewImg((prev) => [...prev, e.target.result.split(' ')]);
                };
            })(f);
            // Read in the image file as a data URL.
            FReader.readAsDataURL(f);

        }
        setImages(files);

    }


    const onSend = async (e) => {
        e.preventDefault();

        if (images == null || images.length == 0) {
            return toast.warning("Загрузите фото или видео!");
        }

        const promises = [];

        if (images) {
            setLoading(true);
            const storageRef = storage.ref();

            for (let i = 0; i < images.length; i++) {
                const uploadTask = storageRef.child('assets/images/' + images[i].name).put(images[i]);

                promises.push(
                    uploadTask
                        .then(snapshot => {
                            return snapshot.ref.getDownloadURL()
                        })
                        .catch((error) => toast.error(error.message))
                )
            }


            const URLs = await Promise.all(promises);

            await firestore.collection('posts').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                text: value,
                img: URLs,
                like: false,
                countLikes: 0
            })
                .then((docRef) => {
                    toast.success('Новый пост добавлен!')
                }).catch((error) => toast.error(error.message))

            setLoading(false);


            // setLoading(false);
            // uploadTask.on("state_changed", (snapshot) => {
            //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // },
            //     (error) => {
            //         switch (error) {
            //             case 'storage/unauthorized':
            //                 console.log('User not authorization');
            //                 break;
            //             case 'storage/cancelled':
            //                 console.log('Upload was cancelled');
            //                 break;
            //             case 'storage/unknown':
            //                 console.log(error.message);
            //                 break;
            //         }
            //     }, () => {
            //         firestore.collection('posts').add({
            //             uid: user.uid,
            //             displayName: user.displayName,
            //             photoURL: user.photoURL,
            //             email: user.email,
            //             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            //             text: value,
            //             img: URLs
            //         })
            //             .then((docRef) => {
            //                 toast.success('Новый пост добавлен!')
            //             }).catch((error) => toast.error(error.message))
            //     });
            setValue('');
            setImages([]);
            setPreviewImg([]);
        }
    }

    const onKeyDown = (e) => {
        if (e.which == 13) {
            onSend(e);
        }
    }
    const onEmojiClick = (event, emojiObject) => {
        setValue((prev) => (prev.concat(emojiObject.emoji)));
    };

    const onShowSmile = () => {
        setShowSmile(!showSmile);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setShowSmile(false);
        }
        return;
    })

    return (
        <form className="addPost" onSubmit={onSend}>
            <div className="addPost__title">
                <DriveFileRenameOutlineIcon className="addPost__icon" />
                <p style={{ pointerEvents: 'none' }}>Создать пост</p>
            </div>
            <div className="addPost__info">
                <Avatar className="addPost__avatar" src={user.photoURL} />
                <textarea placeholder="Описание..." onKeyDown={onKeyDown} rows="5" cols="45"
                    className={`addPost__input ${theme == themes.dark ? 'is-darkness-container' : ''}`}
                    value={value} onChange={(e) => setValue(e.target.value)} ></textarea>
            </div>
            <div>
                {previewImg && previewImg.map((img, index) =>
                    <img key={String(index + img)} src={img} alt={img} style={{ margin: '3px 1.5px 0px', maxHeight: '75px', maxWidth: '75px' }} />
                )}
            </div>
            <div className="addPost__options">
                <div className="addPost__left">
                    <div className="addPost__option">
                        <input type="file" id="option1" onChange={(e) => onHandleChangeImage(e.target.files)} accept="image/*" multiple />
                        <label htmlFor="option1"><PhotoIcon className="addPost__icon" style={{ color: '#2563EB' }} />Фото/Видео </label>
                    </div>
                    {/* <div className="addPost__option">
                        <label htmlFor="option2"><GifBoxIcon className="addPost__icon" style={{ color: '#059669' }} /> </label>
                    </div> */}
                    <div className="addPost__option"
                        style={{ position: 'relative' }}>
                        <label htmlFor="option3" onClick={onShowSmile}><SentimentVerySatisfiedIcon className="addPost__icon" style={{ color: 'orange' }} />Смайлики</label>
                        {showSmile ?
                            <div style={{ position: 'absolute', zIndex: 50 }}>
                                <Picker
                                    onEmojiClick={onEmojiClick}
                                    disableAutoFocus={true}
                                    pickerStyle={{ boxShadow: 'none' }}
                                    groupNames={{ smileys_people: 'PEOPLE' }}
                                />
                            </div>
                            : ''}
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