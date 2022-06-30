import React, { memo, useEffect, useState } from 'react';
import StoryWheel from '../../components/StoryWheel';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import Loader from '../../components/Loader/Loader';
import { useSelector } from 'react-redux';

function Feed() {

    const { status, posts } = useSelector((state) => state.posts);
    const { currentUser } = useSelector((state) => state.users);

    return (
        <div className="feed">
            <StoryWheel />
            <div className="feed__body">
                <AddPost />
                {
                    status === 'loading' && <div style={{ margin: '0 auto' }}><Loader /></div>
                }
                {posts &&
                    posts.map((post, index) => {
                        return (
                            <Post key={index} {...post} />
                        )
                    })
                }
            </div>
        </div >
    )
}

export default memo(Feed);


