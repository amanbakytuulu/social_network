import React from 'react';
import Story from './Story';
import StoryAdd from './StoryAdd';

function StoryWheel() {
    return (
        <div className="storyWheel" >
            <StoryAdd title="Add post"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-1.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-6.jpg" title="Erica Jones"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-1.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-6.jpg" title="Erica Jones"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" title="Dennis Han"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" title="Dennis Han"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" title="Dennis Han"/>
        </div>
    )
}

export default StoryWheel
