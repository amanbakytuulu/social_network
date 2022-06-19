import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getAuth } from 'firebase/auth';
import { firestore } from '../../firebase';
import AddPost from '../../components/AddPost';
import { useLoading } from './../../hooks/useLoading';
import Post from '../../components/Post';
import { NavLink } from 'react-router-dom';
import Loader from './../../components/Loader/Loader';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

function Profile() {

    const auth = getAuth();
    const user = auth.currentUser;
    const { currentUser, users } = useSelector((state) => state.users);
    const { posts, status } = useSelector((state) => state.posts);

    const [myPosts] = useState(posts?.filter((post) => post.post.uid == user?.uid));

    return (
        <div className="container is-max-desktop mx-auto mt-6 profile">
            <div className="columns is-align-items-center mb-5 profile__top">
                <div className="column is-3 profile__left">
                    <figure class="image">
                        <Avatar src={user.photoURL} alt="logo" className="is-rounded" style={{ width: '215px', height: '215px' }} />
                    </figure>
                </div>
                <div className="column is-9 profile__right">
                    <h3 className="is-size-4 has-text-weight-semibold">{user.displayName}</h3>
                    <p className="my-2">{currentUser?.currentUser.about}</p>
                    <p className="has-text-weight-semibold">{`${currentUser?.currentUser.location.country}, ${currentUser?.currentUser.location.city}`} </p>
                    <div className="is-flex my-5">
                        <button className="button px-5 has-text-weight-semibold is-success is-outlined">Add Friend</button>
                        <button className="button px-5 has-text-weight-semibold mx-3 is-link ">Send Message</button>
                        <button className="button p-2" style={{ borderRadius: '50%' }}><KeyboardArrowDownIcon /></button>
                    </div>
                    <div className="is-flex is-justify-content-space-between">
                        <p className="is-size-5">{myPosts.length > 1000 ? `${myPosts.length}k` : myPosts.length} <span className="has-text-weight-bold">Посты</span></p>
                        <p className="is-size-5 pl-3" style={{ borderLeft: '1px solid #ddd' }}>
                            {currentUser?.currentUser.followers.length > 1000
                                ?
                                `${currentUser?.currentUser.followers.length}k`
                                :
                                currentUser?.currentUser.followers.length
                            } <span className="has-text-weight-bold">Подписчики</span></p>
                        <p className="is-size-5 pl-3" style={{ borderLeft: '1px solid #ddd' }}>
                            {currentUser?.currentUser.following.length > 1000
                                ?
                                `${currentUser?.currentUser.following.length}k`
                                :
                                currentUser?.currentUser.following.length
                            } <span className="has-text-weight-bold">Подписки</span></p>
                    </div>
                </div>
            </div>
            <div className="profile__bottom">
                <div className="profile__bottom-left">
                    <div className="profile__sidebar">
                        <h2 className="is-size-5 mb-4 has-text-weight-bold">Посты</h2>
                        <div className="is-flex is-flex-wrap-wrap is-clipped">
                            {status === 'loading' && <Loader />}
                            {posts &&
                                posts.map(({ post }, index) => {
                                    return index < 6 ? < img src={post.img} alt="" /> : null
                                })
                            }
                        </div>
                        <NavLink to='/'>
                            <button type="button" className="button is-rounded mt-4 is-fullwidth has-background-blue" style={{border:'none'}}>Узнать больше</button>
                        </NavLink>
                    </div>
                    <div className="profile__sidebar">
                        <h2 className="is-size-5 mb-4 has-text-weight-bold">Друзья</h2>
                        <div className="is-flex is-flex-wrap-wrap is-clipped">
                            {status === 'loading' && <Loader />}
                            {posts &&
                                posts.map(({ post }, index) => {
                                    return index < 6 ? (
                                        <div>
                                            <img src={post.img} alt="" />
                                            <p>{post.displayName}</p>
                                        </div>
                                    ) : (null)
                                })
                            }
                        </div>
                        <NavLink to='/'>
                            <button type="button" className="button is-rounded mt-4 is-fullwidth has-background-blue" style={{border:'none'}}>Узнать больше</button>
                        </NavLink>
                    </div>
                </div>

                <div className="profile__bottom-right">
                    <AddPost />
                    {status === 'loading' && <Loader />}
                    {myPosts &&
                        myPosts.map((post, index) => {
                            return (
                                <Post key={index} {...post} index={index} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile