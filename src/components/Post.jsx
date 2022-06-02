import { Avatar } from '@mui/material';
import React, { useEffect, useState, memo } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ReactElasticCarousel from 'react-elastic-carousel';
import { Circle } from '@mui/icons-material';
import { firestore } from '../firebase';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import PostDetail from './Details/PostDetail';

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

function Post({ post, doc }) {

    const { displayName, createdAt, photoURL, img, text, uid } = post;

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(text);
    const [edit, setEdit] = useState(false);
    const [active, setActive] = useState(false);
    const [comments, setComments] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        let unsubscribe;

        unsubscribe = firestore.collection('posts').doc(doc)
            .collection('comments').orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })

        return () => {
            unsubscribe();
        }
    }, [comments])

    document.addEventListener('keydown', ({ key }) => {
        if (key == 'Escape') {
            setActive(false);
        }
    })

    const onDelete = (docId) => {
        const isTrue = window.confirm('Вы хотите удалить?');
        if (isTrue) {
            firestore.collection('posts').doc(docId).delete()
                .then(() => toast.success('Пост успешно удален!'))
                .catch((error) => toast.error(error.message))
        }
    }

    return (
        <div className="post">
            <div className="post__top">
                <div className="post__top-left">
                    <Avatar src={photoURL} className="post__avatar" />
                    <div className="post__info">
                        <a href="#">{displayName}</a>
                        <p>{new Date(createdAt?.toDate()).toUTCString()}</p>
                    </div>
                </div>
                {
                    user.uid === uid ?
                        <div className="post__top-right" onClick={() => setShow(!show)}>
                            <div className={`options ${show && 'show'}`}>
                                <div className="options__item options__edit" onClick={() => setEdit(true)}>
                                    <EditIcon className="options__icon" />
                                    <p>Редактировать</p>
                                </div>
                                <div className="options__item options__delete" onClick={() => onDelete(doc)}>
                                    <DeleteOutlineIcon className="options__icon" />
                                    <p>Удалить</p>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            <div className="post__img">
                {
                    typeof img == 'object' && img.length > 1 ?
                        // <ReactElasticCarousel renderPagination={({ pages, activePage, onClick }) => {
                        //     return (
                        //         <div style={{ display: 'flex', flexDirection: 'row' }}>
                        //             {pages.map(page => {
                        //                 const isActivePage = activePage === page
                        //                 return (
                        //                     <Circle
                        //                         className={`paginate ${isActivePage ? 'is-active' : ''}`}
                        //                         key={page}
                        //                         onClick={() => onClick(page)}
                        //                         active={isActivePage}
                        //                     ></Circle>
                        //                 )
                        //             })}
                        //         </div>
                        //     )
                        // }} >
                        //     {
                        //         img.map((item, index) => <img key={String(uid + index)} src={item} alt="img__post" />)
                        //     }
                        // </ReactElasticCarousel>
                        <ImageGallery items={img.map((item) => ({ original: item, thumbnail: item }))} showNav={false} showIndex={true} stopPropagation={true} />
                        :
                        <ImageGallery items={img.map((item) => ({ original: item, thumbnail: item }))} showNav={false} showThumbnails={false} showPlayButton={false} />

                    //     img && img.includes('.mp4', 'mp3') ?
                    // <video controls className="post__video">
                    //     <source src={img} />
                    // </video> :
                    // <img src={strImg} alt="img__post" className={`${scale ? 'scale' : ''}`}
                    //     onClick={() => setScale(!scale)} />
                }
            </div>
            {text.length !== 0 &&
                <div className="post__text">
                    <p>{text}</p>
                </div>
            }
            <div className="post__bottom mt-2">
                <div className="post__left">
                    <div className="post__option">
                        <div>
                            <ThumbUpIcon className="post__icon" fontSize="small" /> <strong>Лайк <span>(27)</span></strong>
                        </div>
                        <div onClick={() => setActive(true)}>
                            <MapsUgcOutlinedIcon className="post__icon" fontSize="medium" /> <strong>Коммент <span>({comments.length})</span></strong>
                        </div>
                    </div>
                    <div className="post__option">
                        <div>
                            <ShareOutlinedIcon className="post__icon" fontSize="medium" /> <strong style={{ margin: '0px 0px 0px 10px' }}>Share <span>(3)</span></strong>
                        </div>
                    </div>
                </div>
                {/* <div className="post__right">
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/dan.jpg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/david.jpg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/edward.jpeg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/milly.jpg" />
                    <div className="post__liked">Liked
                        <a href="#"> <strong>Johnson</strong> </a>and
                        <strong> 23 Others</strong>
                    </div>
                </div> */}
            </div>

            <PostDetail doc={doc} postik={post} comments={comments} active={active} setActive={setActive} />

        </div>
    )
}

export default memo(Post)
