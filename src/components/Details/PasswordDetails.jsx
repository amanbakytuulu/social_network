import React from 'react'
import SettingLayout from '../SettingLayout'
import avatar from '../../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';

function PasswordDetails() {

  const onSend = (e) => {
    e.preventDefault();
  }
  const auth = getAuth();

  const user = auth.currentUser;

  return (
    <SettingLayout title="Изменить пароль">
      <form action="">
        <div className="columns is-block">
          <div className="column">
            <div class="field">
              <label class="label">Текущий пароль</label>
              <div class="control">
                <input class="input" type="text" placeholder="Пароль..." />
              </div>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <label class="label">Новый пароль</label>
              <div class="control">
                <input class="input" type="text" placeholder="Новый пароль..." />
              </div>
            </div>
          </div>
          <div className="column">
            <div class="field">
              <label class="label">Повторите пароль</label>
              <div class="control">
                <input class="input" type="text" placeholder="Новый пароль..." />
              </div>
            </div>
          </div>
        </div>
        
        <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
          onClick={onSend}>Сохранить</button>
      </form>
    </SettingLayout>
  )
}

export default PasswordDetails