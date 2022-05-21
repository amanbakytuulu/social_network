import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReactElasticCarousel from 'react-elastic-carousel';
import { Circle } from '@mui/icons-material';
import { firestore } from '../firebase';
import { toast } from 'react-toastify';

function Post(props) {

    const { displayName, createdAt, photoURL, img, text, uid, doc } = props;
    const [show, setShow] = useState(false);

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
                <div className="post__top-right" onClick={() => setShow(!show)}>
                    <div className={`options ${show && 'show'}`}>
                        <div className="options__item" onClick={() => alert(img.length)}>
                            <EditIcon className="options__icon" />
                            <p>Редактировать</p>
                        </div>
                        <div className="options__item" onClick={() => onDelete(doc)}>
                            <DeleteOutlineIcon className="options__icon" />
                            <p>Удалить</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="post__text">
                <p>{text}</p>
            </div>
            {
                typeof img == 'object' && img.length > 1 ?
                    <ReactElasticCarousel renderPagination={({ pages, activePage, onClick }) => {
                        return (
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {pages.map(page => {
                                    const isActivePage = activePage === page
                                    return (
                                        <Circle
                                            className={`paginate ${isActivePage ? 'is-active' : ''}`}
                                            key={page}
                                            onClick={() => onClick(page)}
                                            active={isActivePage}
                                        ></Circle>
                                    )
                                })}
                            </div>
                        )
                    }} >
                        {
                            img.map((item, index) => <img key={String(uid + index)} src={item} alt="img__post" />)
                        }
                    </ReactElasticCarousel>
                    :
                    <img src={img} alt="img__post" />

                //     img && img.includes('.mp4', 'mp3') ?
                // <video controls className="post__video">
                //     <source src={img} />
                // </video> :
                // <img src={strImg} alt="img__post" className={`${scale ? 'scale' : ''}`}
                //     onClick={() => setScale(!scale)} />
            }
            <div className="post__bottom">
                <div className="post__left">
                    <div className="post__option">
                        <ThumbUpIcon className="post__icon" fontSize="small" /> <strong>Like <span>(27)</span></strong>
                        <TextsmsIcon className="post__icon" fontSize="small" /> <strong>Comment <span>(10)</span></strong>
                    </div>

                    <div className="post__option">
                        <ShareIcon className="post__icon" fontSize="medium" /> <strong style={{ margin: '0px 0px 0px 10px' }}>Share <span>(3)</span></strong>
                    </div>
                </div>
                <div className="post__right">
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/dan.jpg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/david.jpg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/edward.jpeg" />
                    <Avatar className="post__ava" src="https://friendkit.cssninja.io/assets/img/avatars/milly.jpg" />
                    <div className="post__liked">Liked
                        <a href="#"> <strong>Johnson</strong> </a>and
                        <strong> 23 Others</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
