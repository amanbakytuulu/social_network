import React, { useState, useEffect, memo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarChat from './components/SidebarChat';
import { auth, firestore } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUsers, getCurrentUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './redux/postSlice';
import { fetchStories } from './redux/storySlice';


function App() {

  const [user] = useAuthState(auth);
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    dispatch(fetchStories())
  }, [])


  useEffect(() => {
    dispatch(getCurrentUser(user?.uid));
  }, [user, users])

  return (
    <>
      {
        user ? (
          <div className="app">
            <Header setActive={setActive} active={active} />
            <div className="app__body">
              <Sidebar />
              <Outlet />
              <SidebarChat />
            </div>
          </div>
        ) : (
          navigate('login/signIn', { replace: true })
        )
      }
    </>
  )
}

export default memo(App);
