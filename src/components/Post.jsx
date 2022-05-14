import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';

function Post(props) {

    const { displayName, createdAt, photoURL, img, text, index } = props;
    const [scale,setScale] = useState(false);

    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={photoURL} className="post__avatar" />
                <div className="post__info">
                    <a href="#">{displayName}</a>
                    <p>{new Date(createdAt?.toDate()).toUTCString()}</p>
                </div>
            </div>

            <div className="post__text">        
                <p>{text}</p>
            </div>
            {
                img && img.includes('.mp4','mp3') ?
                    <video controls className="post__video">
                        <source src={img} />
                    </video> :
                    <img src={img} alt="img__post" className={`${scale ? 'scale':''}`} 
                    onClick={()=>setScale(!scale)}/>
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
