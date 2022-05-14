import React from 'react';
import SidebarRow from './SidebarRow';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';

function Sidebar({ setActive, active }) {
    return (
        <div className={`sidebar ${active ? 'show' : ''} `}>
            <div className="sidebar__panels">
                <div className="sidebar__panel">
                    <h3>Страницы</h3>

                    <SidebarRow Icon={FeedIcon} title="Новости" bg_gradient="btn-round-md bg-blue-gradient" setActive={setActive}/>
                    <SidebarRow Icon={ExploreIcon} title="Explore" bg_gradient="btn-round-md bg-orange-gradient" setActive={setActive}/>
                    <SidebarRow Icon={FlagIcon} title="Explore Stories" bg_gradient="btn-round-md bg-yellow-gradient" setActive={setActive}/>
                    <SidebarRow Icon={ChatBubbleOutlineIcon} title="Сообщения" bg_gradient="btn-round-md bg-red-gradient" setActive={setActive}/>
                    <SidebarRow Icon={PermIdentityIcon} title="Профиль"bg_gradient="btn-round-md bg-sky-gradient" setActive={setActive}/>
                </div>
                <div className="sidebar__panel">
                    <h3>Аккаунт</h3>

                    <SidebarRow Icon={SettingsIcon} title="Настройки" color="#9f9999" setActive={setActive}/>
                    <SidebarRow Icon={AssessmentIcon} title="Аналитика" color="#9f9999" setActive={setActive}/>
                    <SidebarRow Icon={ChatIcon} title="Чат" color="#9f9999" setActive={setActive}/>
                </div>
                

            </div>
        </div>
    )
}

export default Sidebar
