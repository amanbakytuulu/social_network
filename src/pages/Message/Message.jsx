import React, { useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import avatar1 from '../../assets/images/avatar1.png';
import avatar2 from '../../assets/images/avatar2.png'


function Message() {

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="message">
        <div className="container">
          <div className="message__top">
            <div className="message__info">
              <img src={avatar1} alt="photo" />
              <p>Team leader</p>
            </div>
            <div className="message__actions" onClick={()=>setShow(!show)}>
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
          <div className="message__input">
            <button className="message__voice"><KeyboardVoiceIcon /></button>
            <input type="text" />
            <button className="message__send"><SendIcon className="message__send-icon" /> </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Message