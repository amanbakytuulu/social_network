import React, { useEffect, useState } from 'react'
import SettingLayout from '../SettingLayout'
import { getAuth } from 'firebase/auth';
import { useLoading } from './../../hooks/useLoading';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { toast } from 'react-toastify';
import { socialResolver } from './../../validates/socialResolver';
import { useForm } from 'react-hook-form';

function SocialDetails() {

    const auth = getAuth();
    const user = auth.currentUser;
    const { loading, setLoading } = useLoading();
    let navigate = useNavigate();

    const [doc, setDoc] = useState([]);
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [instagram, setInstagram] = useState("");
    const [vk, setVk] = useState("");
    const [skype, setSkype] = useState("");
    const [google, setGoogle] = useState("");
    const [github, setGitHub] = useState("");


    useEffect(() => {
        firestore.collection("users").where('uid', '==', user.uid)
            .onSnapshot((snap) => setDoc(snap.docs.map((doc) =>
                ({ doc: doc.id, data: doc.data() }))))

    }, [])

    useEffect(() => {
        setFacebook(doc[0]?.data.social?.facebook || "");
        setTwitter(doc[0]?.data.social?.twitter || "");
        setLinkedIn(doc[0]?.data.social?.linkedIn || "");
        setInstagram(doc[0]?.data.social?.instagram || "");
        setVk(doc[0]?.data.social?.vk || "");
        setSkype(doc[0]?.data.social?.skype || "");
        setGoogle(doc[0]?.data.social?.google || "");
        setGitHub(doc[0]?.data.social?.github || "");
    }, [doc])

    const { formOptions } = socialResolver();
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSend = (data) => {
        setLoading(true);

        firestore.collection("users").doc(doc[0].doc).update({
            social: {
                facebook, twitter, linkedIn, instagram, vk, github,
                skype, google
            }
        }).then(() => {
            setLoading(false);
            navigate("/");
            return toast.success("Успешно обновлено!");
        }).catch((error) => {
            navigate("/");
            return toast.error("Что то пошло не так!")
        })
    }


    return (
        <SettingLayout title="Социальные сети">
            <form onSubmit={handleSubmit(onSend)}>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Facebook</label>
                            <div class="control">
                                <input class={`input ${errors.facebook ? 'is-danger' : ''}`} type="text" placeholder="Facebook..."
                                    {...register('facebook')}
                                    value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.facebook?.message}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Twitter</label>
                            <div class="control">
                                <input className={`input ${errors.twitter ? 'is-danger' : ''}`} type="text" placeholder="Twitter..."
                                    {...register('twitter')}
                                    value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.twitter?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Linkedin</label>
                            <div class="control">
                                <input className={`input ${errors.linkedIn ? 'is-danger' : ''}`} type="text" placeholder="Linkedin..."
                                    {...register('linkedIn')}
                                    value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.linkedIn?.message}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Instagram</label>
                            <div class="control">
                                <input className={`input ${errors.instagram ? 'is-danger' : ''}`} type="text" placeholder="Instagram..."
                                    {...register('instagram')}
                                    value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.instagram?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Vk</label>
                            <div class="control">
                                <input className={`input ${errors.vk ? 'is-danger' : ''}`} type="text" placeholder="Vk..."
                                    {...register('vk')}
                                    value={vk} onChange={(e) => setVk(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.vk?.message}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Github</label>
                            <div class="control">
                                <input className={`input ${errors.github ? 'is-danger' : ''}`} type="text" placeholder="Github..."
                                    {...register('github')}
                                    value={github} onChange={(e) => setGitHub(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.github?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Skype</label>
                            <div class="control">
                                <input className={`input ${errors.skype ? 'is-danger' : ''}`} type="text" placeholder="Skype..."
                                    {...register('skype')}
                                    value={skype} onChange={(e) => setSkype(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.skype?.message}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Google</label>
                            <div class="control">
                                <input className={`input ${errors.google ? 'is-danger' : ''}`} type="text" placeholder="Google..."
                                    {...register('google')}
                                    value={google} onChange={(e) => setGoogle(e.target.value)} />
                            </div>
                            <p className="help has-text-danger-dark">{errors.google?.message}</p>
                        </div>
                    </div>
                </div>

                {loading ?
                    <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
                        disabled>Подождите
                    </button>
                    :
                    <button type="submit" className="button is-link py-5 px-6 has-text-weight-semibold"
                    >Сохранить
                    </button>
                }
            </form>
        </SettingLayout>
    )
}

export default SocialDetails