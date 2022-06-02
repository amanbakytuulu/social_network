import React from 'react';
import SidebarRow from './SidebarRow';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { NavLink } from 'react-router-dom';

function Sidebar({ setActive, active }) {
    return (
        <div className={`sidebar ${active ? 'show' : ''} `}>
            <div className="sidebar__panels">
                <div className="sidebar__panel">
                    <h3>Страницы</h3>
                    <NavLink to="/">
                        <SidebarRow Icon={FeedIcon} title="Новости" bg_gradient="btn-round-md bg-blue-gradient" setActive={setActive} />
                    </NavLink>
                    <SidebarRow Icon={ExploreIcon} title="Explore" bg_gradient="btn-round-md bg-orange-gradient" setActive={setActive} />
                    <SidebarRow Icon={FlagIcon} title="Explore Stories" bg_gradient="btn-round-md bg-yellow-gradient" setActive={setActive} />
                    <NavLink to="chat">
                        <SidebarRow Icon={ChatBubbleOutlineIcon} title="Сообщения" bg_gradient="btn-round-md bg-red-gradient" setActive={setActive} />
                    </NavLink>
                    <SidebarRow Icon={PermIdentityIcon} title="Профиль" bg_gradient="btn-round-md bg-sky-gradient" setActive={setActive} />
                </div>
                <div className="sidebar__panel">
                    <h3>Аккаунт</h3>
                    <NavLink to="settings">
                        <SidebarRow Icon={HandymanOutlinedIcon} title="Настройки" color="#9f9999" setActive={setActive} />
                    </NavLink>
                    <SidebarRow Icon={AssessmentOutlinedIcon} title="Аналитика" color="#9f9999" setActive={setActive} />
                    <SidebarRow Icon={ChatBubbleOutlineOutlinedIcon} title="Чат" color="#9f9999" setActive={setActive} />
                </div>


            </div>
        </div>
    )
}

export default Sidebar
