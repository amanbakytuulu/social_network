import React, { useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import avatar1 from '../../assets/images/avatar1.png';
import avatar2 from '../../assets/images/avatar2.png'
import IosShareIcon from '@mui/icons-material/IosShare';
import { getAuth } from 'firebase/auth';
import { Avatar } from '@mui/material';

function Message() {

  const auth = getAuth();
  const user = auth?.currentUser;

  const [show, setShow] = useState(false);

  const onSendMessage = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <div className="message">
        <div className="container">
          <div className="message__top">
            <div className="message__info">
              <Avatar src={user.photoURL} alt="photo"/>
              <p>{user.displayName}</p>
            </div>
            <div className="message__actions" onClick={() => setShow(!show)}>
              <div className={`options ${show && 'show'}`}>
                <div className="options__item">
                  <DeleteOutlineIcon className="options__icon" />
                  <p>Delete chat</p>
                </div>
                <div className="options__item">
                  <AccessTimeIcon className="options__icon" />
                  <p>Block</p>
                </div>
              </div>
            </div>
          </div>

          <div className="message__items">
            <div className="message__item">
              <div className="message__user">
                <img src={avatar1} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms">
                I'm fine, how are you.
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                I want those files for you. I want you to send 1 PDF and 1 image file.            </div>
            </div>
            <div className="message__item">
              <div className="message__user">
                <img src={avatar1} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms">
                I've found some cool photos for our travel app.
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
            <div className="message__item">
              <div className="message__user">
                <img src={avatar1} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms">
                I've found some cool photos for our travel app.
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
            <div className="message__item">
              <div className="message__user">
                <img src={avatar1} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms">
                I've found some cool photos for our travel app.
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
            <div className="message__item" style={{ alignSelf: 'flex-end' }}>
              <div className="message__user" style={{ justifyContent: 'flex-end' }}>
                <img src={avatar2} alt="" />
                <div>
                  <h5>Byrom Guittet</h5>
                  <div>01:35 PM</div>
                </div>
              </div>
              <div className="message__sms" style={{ background: '#0055FF', color: 'white' }}>
                Hey mate! How are things going ?
              </div>
            </div>
          </div>
          <form onSubmit={onSendMessage}>
            <div className="field">
              <button className="message__voice mr-1"><KeyboardVoiceIcon /></button>
              <input type="file" id="photo" style={{ display: 'none' }} />
              <label htmlFor="photo">
                <IosShareIcon />
              </label>

              <p className="control has-icons-right">
                <input className="input px-4" type="text" placeholder="Сообщение..." />
              </p>
              <button type="submit" className="message__send"><SendIcon className="message__send-icon" /> </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Message