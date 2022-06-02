import React from 'react'
import { firestore } from '../../firebase'
import { useState, useEffect } from 'react';
import avatar from '../../assets/i.jpg';
import { getAuth } from 'firebase/auth';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import firebase from './../../firebase';

function PostDetail({ doc, postik, comments, active, setActive }) {

    const auth = getAuth();
    const user = auth?.currentUser;
    const [comment, setComment] = useState("");

    const onSendComment = ({ key }) => {

        if (comment == "" || comment.length == 0) {
            return;
        }
        if (key == "Enter") {
            firestore.collection('posts').doc(doc).collection('comments').add({
                text: comment,
                userName: user.displayName,
                photoURL: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            setComment("");
        }

    }

    return (
        <div id="modal" className={`modal postDetail ${active ? 'is-active' : ''}`} style={{ zIndex: 999 }}>
            <div className="modal-background" onClick={() => setActive(false)}></div>
            <div className="modal-content container is-fullhd is-flex is-align-items-center" >
                <div className="modal__src">
                    <ImageGallery items={postik.img.map((item) => ({ original: item, thumbnail: item }))}
                        lazyLoad={true} showThumbnails={false} showIndex={true} showPlayButton={false}
                        showFullscreenButton={false} />
                </div>
                <div className="box modal__content pt-0 pb-0">
                    <div className="content" style={{ position: 'relative', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, padding: '15px 0px', backgroundColor: 'var(--container-color)' }}>
                            <div className="modal__image image is-32x32 mr-3">
                                <img src={postik.photoURL} className="is-rounded" alt="" />
                            </div>
                            <a href=""><strong>{postik.displayName} </strong> </a>
                            <button type='button' className="button is-success is-outlined is-small">Подписаться</button>
                        </div>
                        <p style={{ marginTop: '2rem' }}>
                            <strong>{postik.displayName} - </strong>
                            <span> {postik.text || '.'}</span>
                        </p>
                        <div className="modal__time">
                            {new Date(postik.createdAt?.toDate()).toUTCString()}
                        </div>
                        <AddCircleOutlineOutlinedIcon fontSize='large' className="modal__icon mt-5 mb-0" />
                        <div className="modal__comments ">
                            {
                                comments &&
                                comments.map((comment) => {
                                    return (
                                        <div className="modal__comment">
                                            <div className="modal__image image is-32x32">
                                                <img src={comment.photoURL} className="is-rounded" alt="" />
                                            </div>
                                            <div className="modal__description">
                                                <p className="mb-2">
                                                    <a href="#" className="mr-0"><strong>{comment?.userName} - </strong></a>
                                                    {comment.text}
                                                </p>
                                                <p className="is-size-7 mt-0 modal__time">
                                                    {new Date(comment.timestamp?.toDate()).toUTCString()}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="p-3" style={{
                            background: 'var(--container-color)',
                            position: 'absolute', bottom: '0px', width: '100%'
                        }}>
                            <input type="text" placeholder="Написать комментарий..."
                                className="input is-size-6 p-4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={onSendComment} />
                        </div>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setActive(false)}></button>
        </div>
    )
}

export default PostDetail