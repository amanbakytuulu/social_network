import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore, storage } from "../firebase";
import { toast } from 'react-toastify';
import firebase from './../firebase';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function (_, { rejectWithValue }) {

        const allUsers = [];

        try {
            await firestore.collection('users').get()
                .then((users) => users.docs.map((user) => {
                    if (user.exists) allUsers.push({ doc: user.id, user: user.data() });
                }))
                .catch((error) => rejectWithValue('Ошибка с сервера!'));

            return allUsers;
        } catch (error) {
            return rejectWithValue('Ошибка с сервера!')
        }
    }
)

export const addNewUser = createAsyncThunk(
    'users/addNewUser',
    async function (user, { rejectWithValue }) {

        const data = [];

        try {
            await firestore.collection('users').add({
                uid: user.uid,
                firstName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                lastName: '',
                phone: '',
                about: '',
                following: [],
                followers: [],
                location: {
                    country: '',
                    city: '',
                    address: '',
                    pin: ''
                },
                socials: {
                    facebook: '',
                    twitter: '',
                    linkedIn: '',
                    instagram: '',
                    vk: '',
                    gitHub: '',
                    skype: '',
                    google: ''
                }
            })
                .then((newPost) => newPost.get().then((post) => (
                    post.exists && data.push({ doc: post.id, post: post.data() })
                )))
                .catch((error) => toast.error('Не удалось добавить пользователя!'));
            return data[0];
        } catch (error) {
            return rejectWithValue('Не удалось добавить пользователя!');
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'users/getCurrentUser',
    async function (uid, { rejectWithValue }) {

        const currentUser = [];

        try {

            await firestore.collection('users').where('uid', '==', uid)
                .get().then((curUser) => curUser.docs.map(user => {
                    user.exists && currentUser.push({ doc: user.id, currentUser: user.data() })
                })).catch((error) => toast.error('Что-то пошло не так!'));

            return currentUser[0];
        } catch (error) {
            return rejectWithValue('Что-то пошло не так!')
        }
    }
)

export const toggleSubscribe = createAsyncThunk(
    'users/toggleSubscribe',
    async function ({ userId, postId, method }, { rejectWithValue, getState, dispatch }) {

        const postUser = getState().users.users.find((user) => user.user.uid === postId);
        const currentUser = getState().users.users.find((user) => user.user.uid === userId);
        try {
            if (method === 'subscribe') {
                await firestore.collection('users').doc(postUser.doc)
                    .update({
                        followers: postUser.user.followers.concat({ uid: userId, photoURL: currentUser.user.photoURL, firstName: currentUser.user.firstName })
                    }).catch((error) => toast.error('не удалось подписаться!'));

                await firestore.collection('users').doc(currentUser.doc)
                    .update({
                        following: currentUser.user.following.concat({ uid: postId, photoURL: postUser.user.photoURL, firstName: postUser.user.firstName })
                    }).catch((error) => toast.error('не удалось подписаться!'));

                dispatch(toogleSubscriber({ cid: userId, pid: postId }))

            } else if (method === 'unsubscribe') {
                await firestore.collection('users').doc(postUser.doc)
                    .update({
                        followers: postUser.user.followers.filter((follow) => follow.uid !== userId)
                    }).catch((error) => toast.error('не удалось отписаться!'));

                await firestore.collection('users').doc(currentUser.doc)
                    .update({
                        following: currentUser.user.following.filter((follow) => follow.uid !== postId)
                    }).catch((error) => toast.error('не удалось отписаться!'));

                dispatch(toggleUnSubscriber({ cid: userId, pid: postId }))
            }

        } catch (error) {
            return rejectWithValue('Ошибка сервера!');
        }
    }
)

export const updatePhoto = createAsyncThunk(
    'users/updatePhoto',
    async function ({ user, photo }, { rejectWithValue, dispatch }) {
        try {
            let storageRef = storage.ref('profilePictures/' + user?.currentUser.uid + '.jpg');
            const uploadTask = storageRef.put(photo);

            uploadTask.on('state_changed', () => { },
                (error) => { },
                () => {
                    storageRef.getDownloadURL().then(async (url) => {
                        await firestore.collection('users').doc(user.doc)
                            .update({
                                photoURL: url
                            })
                        firebase.auth().currentUser.updateProfile({ photoURL: url })

                        dispatch(updateAvatar({ url }))
                    }).then(() => {
                        return toast.success('Успешно обновлено!')
                    })
                })
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async function ({ doc, firstName, lastName, phone, about, photo }, { rejectWithValue, dispatch }) {
        try {
            await firestore.collection('users').doc(doc).update({
                firstName,
                lastName,
                phone,
                about
            }).then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: firstName,
                })

                dispatch(updateProfileDate({ firstName, lastName, phone, about }));
                if (!photo.name) {
                    return toast.success("Успешно обновлено!")
                }
            })
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    status: '',
    error: null,
    users: [],
    currentUser: null
}

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}
const setPending = (state, action) => {
    state.status = 'loading';
    state.error = null;
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        toogleSubscriber(state, action) {
            const currentUser = state.users.find(user => user.user.uid === action.payload.cid)
            const postUser = state.users.find(user => user.user.uid === action.payload.pid)
            currentUser.user.following = currentUser.user.following.concat({ uid: action.payload.pid, photoURL: postUser.user.photoURL, firstName: postUser.user.firstName })
            postUser.user.followers = postUser.user.followers.concat({ uid: action.payload.cid, photoURL: currentUser.user.photoURL, firstName: currentUser.user.firstName })
        },
        toggleUnSubscriber(state, action) {
            const currentUser = state.users.find(user => user.user.uid === action.payload.cid)
            const postUser = state.users.find(user => user.user.uid === action.payload.pid)
            currentUser.user.following = currentUser.user.following.filter(follow => follow.uid !== action.payload.pid)
            postUser.user.followers = postUser.user.followers.filter(follow => follow.uid !== action.payload.cid)
        },
        updateAvatar(state, action) {
            state.currentUser.currentUser.photoURL = action.payload.url
        },
        updateProfileDate(state, action) {
            state.currentUser.currentUser.firstName = action.payload.firstName
            state.currentUser.currentUser.lastName = action.payload.lastName
            state.currentUser.currentUser.phone = action.payload.phone
            state.currentUser.currentUser.about = action.payload.about
        }
    },
    extraReducers: {
        [fetchUsers.pending]: setPending,
        [addNewUser.pending]: setPending,
        [updatePhoto.pending]: setPending,
        [updateProfile.pending]: setPending,
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'success';
            state.users = action.payload
        },
        [addNewUser.fulfilled]: (state, action) => {
            state.users.unshift(action.payload);
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [updatePhoto.pending]: (state, action) => {
            state.status = 'success';
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.status = 'success';
        },
        [fetchUsers.rejected]: setError,
        [addNewUser.rejected]: setError,
        [getCurrentUser.rejected]: setError,
        [updatePhoto.rejected]: setError,
        [updateProfile.rejected]: setError
    }
})

const { toogleSubscriber, toggleUnSubscriber, updateAvatar, updateProfileDate } = userSlice.actions;

export default userSlice.reducer;