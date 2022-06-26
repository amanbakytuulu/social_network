import React from 'react';
import { Avatar } from '@mui/material';

function Story({img,photoURL,firstName}) {
    return (
        <div className="story" style={{backgroundImage:`url(${img})`}} >
            <Avatar src={photoURL} className="story__avatar"/>
            <h4>{firstName}</h4>
        </div>
    )
}

export default Story
