import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SidebarChat from './components/SidebarChat';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';


function App() {

  const [user] = useAuthState(auth);
  const [active, setActive] = useState(true);
  const navigate = useNavigate();


  return (
    <>
      {
        user ? (
          <div className="app">
            <Header setActive={setActive} active={active} />
            <div className="app__body">
              <Sidebar setActive={setActive} active={active} />
              <Outlet />
              <SidebarChat />
            </div>
          </div>
        ) : (
          navigate('login/signIn', {replace:true})
        )
      }
    </>
  )
}

export default App;
