import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase';
import firebase from './../firebase';
import { toast } from 'react-toastify';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function (_, { rejectWithValue }) {

        const allPosts = [];

        try {
            await firestore.collection("posts").orderBy("createdAt", "desc").get()
                .then((posts) => posts.docs.map((post) => {
                    if (post.exists) allPosts.push({ doc: post.id, post: post.data() });
                }))
                .catch((error) => rejectWithValue('Проблемы со сервером!'));

            return allPosts;
        } catch (error) {
            return rejectWithValue('Проблемы со сервером!');
        }
    }
)

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async function ({ user, URLs, value }, { rejectWithValue }) {

        const data = [];

        try {
            await firestore.collection('posts').add({
                uid: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                text: value,
                img: URLs,
                comments: [],
                likes: []
            })
                .then((newPost) => newPost.get().then((post) => (
                    data.push({ doc: post.id, post: post.data() })
                )))
                .catch((error) => toast.error('Что то не так!'))

            return data[0];
        } catch (error) {
            return rejectWithValue('Что то не так!');
        }
    }

)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            await firestore.collection('posts').doc(id).delete()
                .then(() => toast.success('Успешно удалено!'))
                .catch((error) => toast.error('Не удалось удалить!'));

            dispatch(removePost({ id }));
        } catch (error) {
            return rejectWithValue('Что-то пошло не так!')
        }
    }
)

const initialState = {
    status: '',
    error: null,
    posts: []
}

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        removePost(state, action) {
            state.posts = state.posts.filter(post => post.doc !== action.payload.id)
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [addNewPost.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.posts = action.payload;
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.status = 'success';
            state.posts.unshift(action.payload);
        },
        [fetchPosts.rejected]: setError,
        [addNewPost.rejected]: setError
    }
})


const { removePost } = postSlice.actions;

export default postSlice.reducer;

