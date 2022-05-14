import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function StoryAdd({title}) {
    return (
        <div className="storyAdd">
            <AddCircleIcon style={{fontSize:'40px',color:'white',position:'absolute', bottom:'35px', left:'45px'}}/>
            <h4>{title}</h4>
        </div>
    )
}

export default StoryAdd
