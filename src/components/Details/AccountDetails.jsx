import React, { useState, useEffect } from 'react'
import SettingLayout from '../SettingLayout'
import avatar from '../../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { firestore, storage } from '../../firebase';
import firebase from './../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLoading } from './../../hooks/useLoading';
import { Avatar } from '@mui/material';

function AccountDetails() {

  let navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [doc, setDoc] = useState([]);

  const [photo, setPhoto] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState({});
  const [firstName, setFirstName] = useState(user.displayName);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    firestore.collection('users').where('uid', '==', user.uid)
      .onSnapshot((snap) => setDoc(snap.docs.map((doc) =>
        ({ doc: doc.id, data: doc.data() }))));

  }, [])

  useEffect(() => {
    setPhone(doc[0]?.data.phone);
    setLastName(doc[0]?.data.lastName);
    setAbout(doc[0]?.data.about);
  }, [doc])

  const onSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (firstName.length == "") {
      return toast.error("Имя обязательно!")
    }

    if (photo.name) {
      let storageRef = storage.ref('profilePictures/' + user.uid + '.jpg');
      const uploadTask = storageRef.put(photo);

      uploadTask.on('state_changed', () => { },
        (error) => { },
        () => {
          storageRef.getDownloadURL().then((url) => {
            return firebase.auth().currentUser.updateProfile({ photoURL: url })
          }).then(() => {
            navigate("/");
            setLoading(false);
            return toast.success('Фото обновлено!')
          })
        })
    }

    if (firstName.length !== "") {
      firestore.collection('users').doc(doc[0].doc).update({
        name: firstName,
        lastName,
        phone,
        about
      }).then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: firstName,
        })
        setLoading(false);
        return toast.success("Успешно обновлено!")
      })
    }

  }

  const onHandleChangePhoto = (file) => {
    if (file.type.indexOf('image') === -1) {
      setPhoto({});
      return toast.error('Только изображения!')
    }

    const FReader = new FileReader();

    FReader.onload = (e) => {
      setPreviewPhoto(e.target.result);
    }
    FReader.readAsDataURL(file)

    setPhoto(file);

  }

  return (
    <SettingLayout title="Сведения об аккаунте">
      <form>
        <div className="has-text-centered mb-5">
          <figure className="image is-128x128 mx-auto">
            <Avatar src={user.photoURL} alt="avatar_user" sx={{ width: '100%', height: '100%' }} />
          </figure>
          <p className="title is-size-4 has-text-weight-bold mt-3">{user.displayName}</p>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Имя</label>
              <div className="control">
                <input className="input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Имя..." />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Фамилия</label>
              <div className="control">
                <input className="input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Фамилия..." />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Почта..." disabled />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Номер</label>
              <div className="control">
                <input className="input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Тел..." />
              </div>
            </div>
          </div>
        </div>

        <div className="field has-text-centered">
          {Object.keys(previewPhoto).length == 0 ?
            <label htmlFor="select" className="label p-6 has-background-black-ter">
              <div className="control">
                <input type="file" id="select" style={{ display: 'none' }} onChange={(e) => onHandleChangePhoto(e.target.files[0])}
                  accept="image/*" />
              </div>
              <CloudDownloadOutlinedIcon fontSize="large" />
              <div>
                Щелкните, чтобы заменить аватарку
              </div>
            </label>
            :
            <div className="has-text-centered">
              <img src={previewPhoto} alt="changePhoto" width={300} height={300}
                style={{ borderRadius: '50px', maxWidth: '350px', maxHeight: '350px' }} />
              <button type="button" class="delete has-background-black" onClick={() => setPreviewPhoto({})}></button>
            </div>
          }
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">О себе</label>
              <div className="control">
                <textarea className="textarea " type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Описание..."></textarea>
              </div>
            </div>
          </div>
        </div>
        {loading ?
          <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
            disabled>Подождите
          </button>
          :
          <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
            onClick={onSend}>Сохранить
          </button>
        }
      </form>
    </SettingLayout >
  )
}

export default AccountDetails