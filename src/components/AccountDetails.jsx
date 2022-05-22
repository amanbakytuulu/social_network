import React from 'react'
import SettingLayout from './SettingLayout'
import avatar from '../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

function AccountDetails() {

  const onSend = (e) => {
    e.preventDefault();
  }
  const auth = getAuth();

  const user = auth.currentUser;

  return (
    <SettingLayout title="Сведения об аккаунте">
      <form action="">
        <div className="has-text-centered mb-5">
          <figure class="image is-128x128 mx-auto mb-3">
            <img src={user.photoURL} />
          </figure>
          <p className="title is-size-4 has-text-weight-bold">Amanchik</p>
          <p className="subtitle is-size-6">Brooklyn</p>
        </div>
        <div className="columns">
          <div className="column">
            <div class="field">
              <label class="label">Имя</label>
              <div class="control">
                <input class="input" type="text" placeholder="Имя..." />
              </div>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <label class="label">Фамилия</label>
              <div class="control">
                <input class="input" type="text" placeholder="Фамилия..." />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="text" placeholder="Почта..." />
              </div>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <label class="label">Номер</label>
              <div class="control">
                <input class="input" type="text" placeholder="Тел..." />
              </div>
            </div>
          </div>
        </div>

        <div className="field has-text-centered">
          <label htmlFor="select" className="label p-6 has-background-black-ter">
            <div className="control">
              <input type="file" id="select" style={{ display: 'none' }} />
            </div>
            <CloudDownloadOutlinedIcon fontSize="large" />
            <div>
              Перетащите или щелкните, чтобы заменить
            </div>
          </label>
        </div>

        <div className="columns">
          <div className="column">
            <div class="field">
              <label class="label">О себе</label>
              <div class="control">
                <textarea class="textarea " type="text" placeholder="Описание..."></textarea>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
          onClick={onSend}>Сохранить</button>
      </form>
    </SettingLayout >
  )
}

export default AccountDetails