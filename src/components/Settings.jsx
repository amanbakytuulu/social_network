import React from 'react'
import SidebarRow from './SidebarRow';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { auth } from '../firebase';

function Settings() {

  function signOut() {
    const isOut = window.confirm('Вы хотите выйти?');
    if (isOut) {
      auth.signOut();
    }
  }

  return (
    <div className="settings is-half">
      <div className="container">
        <div className="box mt-5">
          <aside className="menu p-5">
            <h1 className="title pb-5 has-text-weight-bold is-size-4-mobile">Настройки </h1>
            <p className="menu-label">
              Общие
            </p>
            <ul className="menu-list">
              <li><a><SidebarRow Icon={ManageAccountsOutlinedIcon} title="Информация об аккаунте" bg_gradient={"btn-round-md bg-sky-gradient"} />
                <span class="icon has-text-grey-light	 mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
              <li><a><SidebarRow Icon={FmdGoodOutlinedIcon} title="Информация об адресе" bg_gradient={"btn-round-md bg-yellow-gradient"} />
                <span class="icon has-text-grey-light mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
              <li><a><SidebarRow Icon={CellTowerOutlinedIcon} title="Социальные сети" bg_gradient={"btn-round-md bg-orange-gradient"} />
                <span class="icon has-text-grey-light mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
            </ul>
            <p className="menu-label">
              Аккаунт
            </p>
            <ul className="menu-list">
              <li><a><SidebarRow Icon={LockOpenOutlinedIcon} title="Изменить пароль" bg_gradient={"btn-round-md bg-blue-gradient"} />
                <span class="icon has-text-grey-light mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
            </ul>
            <p className="menu-label">
              Другие
            </p>
            <ul className="menu-list">
              <li><a><SidebarRow Icon={NotificationsActiveOutlinedIcon} title="Оповещения" bg_gradient={"btn-round-md bg-yellow-gradient"} />
                <span class="icon has-text-grey-light mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
              <li><a onClick={signOut}><SidebarRow Icon={ExitToAppOutlinedIcon} title="Выйти" bg_gradient={"btn-round-md bg-orange-gradient"} />
                <span class="icon has-text-grey-light mr-2">
                  <ArrowForwardIosOutlinedIcon fontSize='middle' />
                </span>
              </a></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Settings