import React, { useEffect, useState } from 'react'
import SettingLayout from '../SettingLayout'
import { getAuth } from 'firebase/auth';
import { firestore } from '../../firebase';
import { toast } from 'react-toastify';
import { useLoading } from './../../hooks/useLoading';
import { useNavigate } from 'react-router-dom';

function AddressDetails() {

    const auth = getAuth();
    const user = auth.currentUser;
    const { loading, setLoading } = useLoading();
    let navigate = useNavigate();

    const [doc, setDoc] = useState([]);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");

    useEffect(() => {
        firestore.collection("users").where('uid', '==', user.uid)
            .onSnapshot((snap) => setDoc(snap.docs.map((doc) =>
                ({ doc: doc.id, data: doc.data() }))))

    }, [])

    useEffect(() => {
        setCountry(doc[0]?.data.location?.country || "");
        setCity(doc[0]?.data.location?.city || "");
        setAddress(doc[0]?.data.location?.address || "");
        setPin(doc[0]?.data.location?.pin || "");
    }, [doc])


    const onSend = (e) => {
        e.preventDefault();
        setLoading(true);
        firestore.collection("users").doc(doc[0].doc).update({
            location: {
                country,
                city,
                address,
                pin
            }
        }).then(() => {
            setLoading(false);
            navigate("/");
            return toast.success("Успешно обновлено!");
        })

    }

    return (
        <SettingLayout title="Местоположение">
            <form action="">
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Страна</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Страна..."
                                    value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Город</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Город..."
                                    value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div class="field">
                            <label class="label">Адрес</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Адрес..."
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div class="field">
                            <label class="label">Pin-код</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Pin..."
                                    value={pin} onChange={(e) => setPin(e.target.value)} />
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
        </SettingLayout>
    )
}

export default AddressDetails