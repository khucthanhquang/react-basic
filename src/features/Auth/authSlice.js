import { createSlice } from '@reduxjs/toolkit';
import apiRequestUser from '../../api/auth';


export const initialState = {
    users: [],
    user: {},
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDataAllUser: (state, action) => {
            state.users = action.payload
        },
        setDataUser: (state, action) => {
            state.user = action.payload
        },
        setDataUserLogout: (state, action) => {
            state.user = action.payload
        }
    }
})

const { reducer, actions } = auth;
export const { setDataAllUser, setDataUser, setDataUserLogout } = actions;
export default reducer;

// API 
// Sign up if db not user
export function userSignup(data) {
    return async dispatch => {
        try {
            await apiRequestUser.create(data);
            dispatch(setDataUser(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Login with user in db
export function userLogin(data) {
    return async dispatch => {
        try {
            dispatch(setDataUser(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Logout
export function userLogout() {
    return async dispatch => {
        try {
            dispatch(setDataUserLogout({}))
        } catch (error) {
            console.log(error)
        }
    }
}
// getAll users
export function getAllUser() {
    return async dispatch => {
        try {
            const { data } = await apiRequestUser.getAll();
            dispatch(setDataAllUser(data))
        } catch (error) {
            console.log(error)
        }
    }
}

// ACOUNT MEDIA

// Change amount and add history
export function updateAcount(objHistory, acount) {
    return async dispatch => {
        try {
            await apiRequestUser.createHistory(objHistory)
            const { data } = await apiRequestUser.update(acount.id, acount);
            dispatch(setDataUser(data))
        } catch (error) {
            console.log(error)
        }
    }
}





