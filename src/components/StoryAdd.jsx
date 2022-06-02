import React from 'react';
import AddIcon from '@mui/icons-material/Add';

function StoryAdd({ title }) {
    return (
        <div className="storyAdd">
            <div className="storyAdd__icon" >
                <AddIcon fontSize="medium" />
            </div>
            <h4>{title}</h4>
        </div>
    )
}

export default StoryAdd
