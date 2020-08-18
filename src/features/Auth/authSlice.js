import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequestUser from '../../api/usersApi';
import Axios from 'axios';


export const initialState = {
    userAuth: [],
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getJwtSuccess: (state, action) => {
            // state.categories = action.payload
        }
    }
})

const { reducer, actions } = auth;
export const { getJwtSuccess } = actions;
export default reducer;

// API 
// Asynchronous login thunk action
export function userLoginFetch(data) {
    return dispatch => {
        alert(1)
        // return Axios.post('/api/auth', data)
        //     .then(res => {
        //         const token = res.data.token;
        //         localStorage.setItem('jwtToken', token)
        //     })
        // try {
        //     const { data } = await apiRequestUser.getAll()
        //     dispatch(getCategorySuccess(data))
        // } catch (error) {
        //     console.log(error)
        // }
    }
}




