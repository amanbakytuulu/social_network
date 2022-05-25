import React, { useState } from 'react'
import SettingLayout from '../SettingLayout'
import avatar from '../../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { firestore, storage } from '../../firebase';
import firebase from './../../firebase';
import { toast } from 'react-toastify';

function AccountDetails() {

  const [photo, setPhoto] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const onSend = (e) => {
    e.preventDefault();

    if (photo) {
      var storageRef = storage.ref('profilePictures/' + user.uid + '.jpg');

      const uploadTask = storageRef.put(photo);

      uploadTask.on('state_changed', () => {

      },
        (error) => {

        },
        () => {
          storageRef.getDownloadURL().then((url) => {
            console.log(url);
            return firebase.auth().currentUser.updateProfile({ photoURL: url })
          }).then(()=>toast.success('Фото обновлено!'))
        })
    }

  }

  return (
    <SettingLayout title="Сведения об аккаунте">
      <form action="">
        <div className="has-text-centered mb-5">
          <figure class="image is-128x128 mx-auto">
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
              <input type="file" id="select" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
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