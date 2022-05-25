import React from 'react'
import SettingLayout from '../SettingLayout'
import avatar from '../../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';

function AddressDetails() {

    const onSend = (e) => {
        e.preventDefault();
    }
    const auth = getAuth();

    const user = auth.currentUser;
    
    return (
        <SettingLayout title="Местоположение">
            <form action="">
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Страна</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Страна..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Город</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Город..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Адрес</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Адрес..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Pin-код</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Pin..." />
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

export default AddressDetails