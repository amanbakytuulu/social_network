import React,{useState} from 'react';

function SidebarRow({Icon,title,color,bg_gradient, setActive}) {

    return (
        <div className={`sidebarRow `} onClick={()=>setActive(false)}> 
            <Icon style={{color, borderRadius:'50px'}} className={`sidebarRow__icon ${bg_gradient}`}/>
            <p className="sidebarRow__title">{title}</p>
        </div>
    )
}

export default SidebarRow
