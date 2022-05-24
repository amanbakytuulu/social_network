import React from 'react';
import Story from './Story';
import StoryAdd from './StoryAdd';
import avatar1 from '../assets/stories/avatar_1.jpg';
import avatar2 from '../assets/stories/avatar_2.jpg';
import avatar3 from '../assets/stories/avatar_3.jpg';

function StoryWheel() {
    return (
        <div className="storyWheel" >
            <StoryAdd title="Add post"/>
            <Story img={avatar1} title="Erica Jones"/>
            <Story img={avatar1} profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-6.jpg" title="Erica Jones"/>
            <Story img={avatar2} title="Dennis Han"/>
            <Story img={avatar3} profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img={avatar3} profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" title="Stella Bella"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" title="Dennis Han"/>
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" profileSrc="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" title="Dennis Han"/>
        </div>
    )
}

export default StoryWheel
