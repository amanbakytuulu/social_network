import React, { useState } from 'react';
import SidebarRow from './SidebarRow';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FeedIcon from '@mui/icons-material/Feed';
import LanguageIcon from '@mui/icons-material/Language';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { NavLink } from 'react-router-dom';

function Sidebar() {

    const [active, setActive] = useState(0);

    return (
        <div className={`sidebar show`}>
            <div className="sidebar__panels">
                <div className="sidebar__panel">
                    <h3>Страницы</h3>
                    <NavLink to="/" onClick={() => setActive(0)}>
                        <SidebarRow Icon={FeedIcon} title="Новости" bg_gradient="btn-round-md bg-blue-gradient" active={active === 0 ? true : false} />
                    </NavLink>
                    <NavLink to="#" onClick={() => setActive(1)}>
                        <SidebarRow Icon={LanguageIcon} title="Explore" bg_gradient="btn-round-md bg-yellow-gradient" active={active === 1 ? true : false} />
                    </NavLink>
                    <NavLink to="chat" onClick={() => setActive(3)}>
                        <SidebarRow Icon={ChatBubbleOutlineIcon} title="Сообщения" bg_gradient="btn-round-md bg-red-gradient" active={active === 3 ? true : false} />
                    </NavLink>
                    <NavLink to="profile" onClick={() => setActive(4)}>
                        <SidebarRow Icon={PermIdentityIcon} title="Профиль" bg_gradient="btn-round-md bg-sky-gradient" active={active === 4 ? true : false} />
                    </NavLink>
                </div>
                <div className="sidebar__panel">
                    <h3>Аккаунт</h3>
                    <NavLink to="settings" onClick={() => setActive(5)}>
                        <SidebarRow Icon={HandymanOutlinedIcon} title="Настройки" color="#9f9999" active={active === 5 ? true : false} />
                    </NavLink>
                    <NavLink to="#" onClick={() => setActive(6)}>
                        <SidebarRow Icon={AssessmentOutlinedIcon} title="Аналитика" color="#9f9999" active={active === 6 ? true : false} />
                    </NavLink>
                    <NavLink to="#" onClick={() => setActive(7)}>
                        <SidebarRow Icon={ChatBubbleOutlineOutlinedIcon} title="Чат" color="#9f9999" active={active === 7 ? true : false} />
                    </NavLink>
                </div>


            </div>
        </div>
    )
}

export default Sidebar
