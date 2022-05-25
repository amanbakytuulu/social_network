import React from 'react'
import SettingLayout from '../SettingLayout'
import avatar from '../../assets/images/avatar1.png';
import { getAuth } from 'firebase/auth';

function SocialDetails() {

    const onSend = (e) => {
        e.preventDefault();
    }
    const auth = getAuth();

    const user = auth.currentUser;
    
    return (
        <SettingLayout title="Социальные сети">
            <form action="">
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Facebook</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Facebook..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Twitter</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Twitter..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Linkedin</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Linkedin..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Instagram</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Instagram..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Vk</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Vk..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Github</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Github..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Skype</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Skype..." />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Google</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Google..." />
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

export default SocialDetails