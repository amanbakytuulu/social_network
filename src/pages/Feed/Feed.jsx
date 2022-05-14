import React, { useEffect, useState} from 'react';
import StoryWheel from '../../components/StoryWheel';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firestore} from '../../firebase';
import Loader from '../../components/Loader/Loader';

function Feed() {

    const [posts, setPosts]= useState([]);

    const [post, loading] = useCollectionData(
        firestore.collection("posts").orderBy("createdAt", "desc")
    );

    useEffect(()=>{
        setPosts(post);
    },[post])

    return (
        <div className="feed">
            <StoryWheel />
            <div className="feed__body">
                <AddPost />
                {
                    loading && <div style={{margin:'0 auto'}}><Loader/></div>
                }
                {posts &&
                    posts.map((post,index) => {
                        return (
                            <Post key={index} {...post} index={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Feed
