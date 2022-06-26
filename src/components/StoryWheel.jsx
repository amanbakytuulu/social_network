import React, { useState } from 'react';
import Story from './Story';
import StoryAdd from './StoryAdd';
import avatar1 from '../assets/stories/avatar_1.jpg';
import avatar2 from '../assets/stories/avatar_2.jpg';
import avatar3 from '../assets/stories/avatar_3.jpg';
import ModalStoryAdd from './ModalStoryAdd';

function StoryWheel() {

    const [show, setShow] = useState(false);

    return (
        <div className="storyWheel" >
            <StoryAdd title="Add Story" setShow={setShow} />
            <Story img={avatar1} firstName="Erica Jones" />
            <Story img={avatar1} photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-6.jpg" firstName="Erica Jones" />
            <Story img={avatar2} firstName="Dennis Han" />
            <Story img={avatar3} photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" firstName="Stella Bella" />
            <Story img={avatar3} photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" firstName="Stella Bella" />
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" firstName="Stella Bella" />
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-5.jpg" photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-3.jpg" firstName="Stella Bella" />
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" firstName="Dennis Han" />
            <Story img="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-lg-2.jpg" photoURL="http://demo.foxthemes.net/socialitev2.2/assets/images/avatars/avatar-2.jpg" firstName="Dennis Han" />
            <ModalStoryAdd show={show} setShow={setShow} />

        </div>
    )
}

export default StoryWheel
