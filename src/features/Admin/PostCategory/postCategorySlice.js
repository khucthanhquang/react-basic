import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequestCategories from '../../../api/postCategory';


export const initialState = {
    categories: [],
}

const post_category = createSlice({
    name: 'post_category',
    initialState,
    reducers: {
        getCategorySuccess: (state, action) => {
            state.categories = action.payload
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload)
        },
        removeCategory: (state, action) => {
            const categoryRemove = action.payload;
            const newState = state.categories.filter(cate => cate.id != categoryRemove.id);
            state.categories = newState;
        },
        editCategory: (state, action) => {
            const categoryEdit = action.payload;
            const categoryEditIndex = state.categories.findIndex(cate => cate.id == categoryEdit.id)
            state.categories[categoryEditIndex] = categoryEdit;
        }
    }
})

const { reducer, actions } = post_category;
export const { getCategorySuccess, addCategory, removeCategory, editCategory } = actions;
export default reducer;

// API 
// Asynchronous list thunk action
export function fetchPostCategory() {
    return async dispatch => {
        try {
            const { data } = await apiRequestCategories.getAll()
            dispatch(getCategorySuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous add thunk action
export function addCategories(data) {
    return async dispatch => {
        try {
            await apiRequestCategories.create(data);
            dispatch(addCategory(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous remove thunk action
export function removeCategories(data) {
    return async dispatch => {
        try {
            await apiRequestCategories.remove(data.id);
            dispatch(removeCategory(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous remove thunk action
export function editCategories(data) {
    return async dispatch => {
        try {
            await apiRequestCategories.update(Number(data.id), data);
            dispatch(editCategory(data))
        } catch (error) {
            console.log(error)
        }
    }
}




