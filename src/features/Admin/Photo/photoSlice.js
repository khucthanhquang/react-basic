import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequestPhoto from '../../../api/photosApi';


export const initialState = {
    photos: [],
    paginationPhoto: [],
    valueSearch: [],
    photosFilterPrice: [],
}

const photo = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        getPhotoSuccess: (state, actions) => {
            state.photos = actions.payload
        },
        addPhotoSuccess: (state, action) => {
            state.photos.push(action.payload)
        },
        removePhotoSuccess: (state, action) => {
            const index = state.photos.findIndex(photo => photo.id == action.payload)
            state.photos.splice(index, 1)
        },
        editPhotoSuccess: (state, action) => {
            const photoEdit = action.payload;
            const photoEditIndex = state.photos.findIndex(photo => photo.id == photoEdit.id)
            state.photos[photoEditIndex] = photoEdit;
        },
        paginationSuccess: (state, action) => {
            state.paginationPhoto = action.payload
        },
        searchSuccess: (state, action) => {
            state.valueSearch = action.payload
        },
        filterPriceSuccess: (state, action) => {
            state.photosFilterPrice = action.payload
        }
    }
})

const { reducer, actions } = photo;
export const { getPhotoSuccess, addPhotoSuccess, removePhotoSuccess, editPhotoSuccess, paginationSuccess, searchSuccess, filterPriceSuccess } = actions;
export default reducer;

// Asynchronous thunk action phân trang
export function fetchPhotosPagination(currentPage) {
    return async dispatch => {
        try {
            const { data } = await apiRequestPhoto.pagination(currentPage);
            dispatch(paginationSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous thunk action search
export function fetchPhotosSearch(value) {
    return async dispatch => {
        try {
            const { data } = await apiRequestPhoto.search(value);
            if (value == '') {
                return
            } else {
                dispatch(searchSuccess(data))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

// Asynchronous thunk action
export function fetchPhotos() {
    return async dispatch => {
        try {
            const { data } = await apiRequestPhoto.getAll()
            dispatch(getPhotoSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous add photo thunk action
export function addPhoto(photo) {
    return async dispatch => {
        try {
            const { data } = await apiRequestPhoto.create(photo)
            dispatch(addPhotoSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous delete photo thunk action
export function removePhoto(id) {
    return async dispatch => {
        try {
            await apiRequestPhoto.remove(id)
            dispatch(removePhotoSuccess(id))
        } catch (error) {
            console.log(error)
        }
    }
}
// Asynchronous delete photo thunk action
export function editPhoto(photo) {
    return async dispatch => {
        try {
            await apiRequestPhoto.update(Number(photo.id), photo)
            dispatch(editPhotoSuccess(photo))
        } catch (error) {
            console.log(error)
        }
    }
}

// Asynchronous FILTER photo thunk action
export function filterPrice() {
    return async dispatch => {
        try {
            const { data } = await apiRequestPhoto.filterPriceApi();
            dispatch(filterPriceSuccess(data))
        } catch (error) {
            console.log(error)
        }
    }
}



