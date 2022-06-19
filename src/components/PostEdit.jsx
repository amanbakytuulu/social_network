import React, { useState, memo } from 'react'
import { getAuth } from 'firebase/auth';
import ReactImageGallery from 'react-image-gallery';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';


function PostEdit({ doc, postik, setPostEdit, postEditActive }) {

    const auth = getAuth();
    const user = auth?.currentUser;
    const { users } = useSelector((state) => state.users);
    const [postUser] = useState(users.filter((user) => user.user.uid === postik.uid));

    return (
        <div id="modal" className={`modal ${postEditActive ? 'is-active' : ''}`} style={{ zIndex: 999 }}>
            <div className="modal-background" onClick={() => setPostEdit(false)}></div>
            <div className="container is-fullhd is-flex is-flex-direction-column is-justify-content-center" style={{ maxWidth: '800px', width: '100%' }}>
                <div className="">
                    <ReactImageGallery items={postik.img.map((item) => ({ original: item, thumbnail: item }))}
                        lazyLoad={true} showThumbnails={false} showIndex={true} showPlayButton={false}
                        showFullscreenButton={false} />
                </div>
                <div className="box  pt-0 pb-5">
                    <div className="content" style={{ position: 'relative', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, padding: '15px 0px', backgroundColor: 'var(--container-color)' }}>
                            <div className="modal__image image is-32x32 mr-3">
                                <Avatar src={postUser[0]?.user.photoURL} className="is-rounded" alt="" sx={{ width: 35, height: 35 }} />
                            </div>
                            <a href=""><strong style={{ color: 'var(--first-color)' }}>{postUser[0]?.user.firstName} </strong> </a>
                        </div>
                        <p className="mt-2">
                            <input type="text" className="input has-background-link" style={{color:'var(--text-color)'}} value={postik.text} />
                        </p>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={() => setPostEdit(false)}></button>
        </div>
    )
}

export default memo(PostEdit)