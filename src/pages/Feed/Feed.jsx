import React, { memo, useEffect, useState } from 'react';
import StoryWheel from '../../components/StoryWheel';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../firebase';
import Loader from '../../components/Loader/Loader';
import Stories from 'react-insta-stories';
import avatar from '../../assets/15sec.mp4'
import { useLoading } from './../../hooks/useLoading';

function Feed() {

    const [posts, setPosts] = useState([]);
    const { loading, setLoading } = useLoading();

    // const [datas, loading] = useCollectionData(
    //     firestore.collection("posts").orderBy("createdAt", "desc").onSnapshot((snapshot)=>{
    //         return snapshot.docs.map((snapshot)=>snapshot.id)
    //     })
    // );

    useEffect(async () => {
        let unsubscribe;
        setLoading(true);
        unsubscribe = await firestore.collection("posts").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
            setLoading(false);
            setPosts(snapshot.docs.map((doc) => {
                return {
                    doc: doc.id,
                    post: doc.data()
                }
            }))
        })

        return () => unsubscribe();
    }, [])

    const stories = [
        {
            url: 'https://repository-images.githubusercontent.com/167136952/c56d0e80-03a4-11ea-8bc9-122fc897e179'
        },
        {
            url: avatar,
            type: 'video'
        },

        {
            url: 'https://codesandbox.io/api/v1/sandboxes/5qxvw/screenshot.png',
            duration: 5000,
            header: {
                heading: 'Mohit Karekar',
                subheading: 'Posted 30m ago',
                profileImage: 'https://picsum.photos/100/100',
            },
        },
        {
            content: (props) => (
                <div style={{ background: 'pink', padding: 20, width: '100%', height: '100%' }}>
                    <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
                    <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
                </div>
            ),
        },
        'https://www.ixbt.com/img/n1/news/2020/5/1/tenor-google.gif'
    ];

    return (
        <div className="feed">
            <StoryWheel />

            {/* <div style={{ marginLeft: '400px' }}>
                <Stories
                    stories={stories}
                    loop={true}
                    onAllStoriesEnd={() => alert('the end')}
                    defaultInterval={1500}
                />
            </div> */}
            <div className="feed__body">
                <AddPost />
                {
                    loading && <div style={{ margin: '0 auto' }}><Loader /></div>
                }
                {posts &&
                    posts.map((post, index) => {
                        return (
                            <Post key={index} {...post} index={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default memo(Feed);
