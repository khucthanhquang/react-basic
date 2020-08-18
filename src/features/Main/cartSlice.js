import { createSlice } from '@reduxjs/toolkit';

const keyLocalStorage = 'CartStorage';
export const initialState = {
    cart: [],
}

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartInStorage: (state, action) => {
            state.cart = action.payload
        },
        updateCartSuccess: (state, action) => {
            localStorage.setItem(keyLocalStorage, JSON.stringify(action.payload));
            state.cart = action.payload
        }
    }
})

const { reducer, actions } = cart;
export const { getCartInStorage, updateCartSuccess } = actions;
export default reducer;

// API 

export function getItemToStorage() {
    return async dispatch => {
        try {
            const getItems = JSON.parse(localStorage.getItem(keyLocalStorage));
            dispatch(getCartInStorage(getItems))
        } catch (error) {
            console.log(error)
        }
    }
}

export function updateCart(dataCart) {
    return async dispatch => {
        try {
            dispatch(updateCartSuccess(dataCart))
        } catch (error) {
            console.log(error)
        }
    }
}




