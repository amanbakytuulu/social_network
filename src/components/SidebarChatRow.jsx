import { Avatar } from '@mui/material';
import React from 'react';

function SidebarChatRow({ profile, name, status }) {
    return (
        <div className="sidebarChatRow">
            <div className="sidebarChatRow__user">
                <Avatar src={profile ? profile : ''} className="sidebarChatRow__avatar" />
                <div className="sidebarChatRow__info">
                    <h6>{name}</h6>
                </div>
            </div>
            <div className="sidebarChatRow__status"
                style={{ background: status, width: '8px', height: '8px', borderRadius: '50px' }}>
            </div>
        </div>
    )
}

export default SidebarChatRow
