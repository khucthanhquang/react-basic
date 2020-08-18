import { configureStore } from "@reduxjs/toolkit";

import categoryReducer from '../features/Admin/Category/categorySlice';
import photoReducer from '../features/Admin/Photo/photoSlice';
import post_categoryReducer from '../features/Admin/PostCategory/postCategorySlice';
import postsReducer from '../features/Admin/Posts/postsSlice'

import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/Main/cartSlice';



const rootReducer = {
    category: categoryReducer,
    photo: photoReducer,
    auth: authReducer,
    cart: cartReducer,
    post_category: post_categoryReducer,
    posts: postsReducer
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;