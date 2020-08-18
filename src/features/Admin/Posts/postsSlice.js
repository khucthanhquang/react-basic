import { createSlice } from '@reduxjs/toolkit';
import apiRequestPost from '../../../api/postsApi';


export const initialState = {
    posts: [],
    paginationPost: [],
}

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPostSuccess: (state, actions) => {
            state.posts = actions.payload
        },
        addPostSuccess: (state, action) => {
            state.posts.push(action.payload)
        },
        removePostSuccess: (state, action) => {
            const newState = state.posts.filter(photo => photo.id != action.payload)
            state.posts = newState
        },
        editPostSuccess: (state, action) => {
            const photoEdit = action.payload;
            const photoEditIndex = state.posts.findIndex(photo => photo.id == photoEdit.id)
            state.posts[photoEditIndex] = photoEdit;
        },
        paginationSuccess: (state, action) => {
            state.paginationPost = action.payload
        }
    }
})

const { reducer, actions } = posts;
export const { getPostSuccess, addPostSuccess, removePostSuccess, editPostSuccess, paginationSuccess } = actions;
export default reducer;

// Asynchronous thunk action phân trang
export function fetchPostsPagination(currentPage) {
    return async dispatch => {
        try {
            const { data } = await apiRequestPost.pagination(currentPage);
            dispatch(paginationSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}

// Asynchronous thunk action
export function fetchPosts() {
    return async dispatch => {
        try {
            const { data } = await apiRequestPost.getAll()
            dispatch(getPostSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous add photo thunk action
export function addPost(photo) {
    return async dispatch => {
        try {
            const { data } = await apiRequestPost.create(photo)
            dispatch(addPostSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous delete photo thunk action
export function removePost(post) {
    return async dispatch => {
        try {
            await apiRequestPost.remove(post.id)
            dispatch(removePostSuccess(post.id))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous delete photo thunk action
export function editPost(photo) {
    return async dispatch => {
        try {
            await apiRequestPost.update(Number(photo.id), photo)
            dispatch(editPostSuccess(photo))
        } catch (error) {
            console.log(error)
        }
    }
}


