import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from '../ThemeContext';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { LightModeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { auth } from '../firebase';
import Notifications from './Notifications';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header({ setActive, active }) {

    const { theme, changeTheme } = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(theme === themes.dark ? true : false);
    const [showNotification, setShowNotification] = useState(false)
    const [user] = useAuthState(auth);

    useEffect(() => {
        changeTheme(darkMode ? themes.dark : themes.light)

    }, [darkMode])


    return (
        <nav style={{ zIndex: '150' }} className={`navbar has-shadows is-spaced is-fixed-top ${darkMode ? 'is-darkness-container' : 'is-white'}`} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink className="navbar-item is-size-3 has-text-weight-semibold" to="/">
                    FREEWARE
                </NavLink>

                <a role="button" className={`navbar-burger ${active ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setActive(!active)}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu`}>
                <div className="navbar-end">
                    <div className="control has-icons-left">
                        <input className={`input is-rounded ${darkMode ? 'is-darkness-bg' : 'has-background-link-light'}`}
                            type="text"
                            placeholder="...Искать друзей, фото или другое" />
                        <span className="icon is-small is-left">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <span className={`icon ${darkMode ? '' : 'has-background-blue'} p-4 is-radius `}>
                            <PeopleOutlineIcon fontSize='small' sx={{ fontSize: 22 }} className="has-text-blue" />
                        </span>
                    </div>
                    <div className="navbar-item ">
                        <span className={`icon ${darkMode ? '' : 'has-background-blue'} p-4 is-radius`}
                            onClick={() => setShowNotification(!showNotification)}>
                            <NotificationsNoneIcon fontSize='small' sx={{ fontSize: 22 }} className="has-text-blue" />
                        </span>
                    </div>
                    <div className="navbar-item ">
                        <NavLink to="/chat">
                            <span className={`icon ${darkMode ? '' : 'has-background-blue'} p-4 is-radius`}>
                                <MailOutlineIcon fontSize='small' sx={{ fontSize: 22 }} className="has-text-blue" />
                            </span>
                        </NavLink>
                    </div>
                    <div className="navbar-item ">
                        <span className={`icon ${darkMode ? '' : 'has-background-blue'} p-4 is-radius`}
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}>
                            {darkMode ? <DarkModeOutlinedIcon fontSize='small' sx={{ fontSize: 22 }} className="has-text-blue" /> : <LightModeOutlined fontSize='small' sx={{ fontSize: 22 }} className="has-text-blue" />}
                        </span>
                    </div>
                    <div className="navbar-item">
                        <NavLink to="/settings">
                            <span className="image">
                                <Avatar src={user?.photoURL} />
                            </span>
                        </NavLink>
                    </div>
                </div>
            </div>
            {showNotification ? <Notifications show={showNotification} /> : <Notifications show={showNotification} />}
        </nav >
    )
}

export default Header
