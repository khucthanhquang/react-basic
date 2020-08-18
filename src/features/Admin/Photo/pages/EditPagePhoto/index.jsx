import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addPhoto, editPhoto } from '../../photoSlice'

EditPagePhoto.propTypes = {

};

function EditPagePhoto(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();
    const { photoId } = useParams();

    const categories = useSelector(state => state.category.categories)
    const listphoto = useSelector(state => state.photo.photos);

    const photoEdit = listphoto.find(photo => photo.id == photoId)
    const [currentPhoto, setCurrentPhoto] = useState(photoEdit);

    const [image, setImage] = useState(currentPhoto.image);
    const [loading, setLoading] = useState(false);

    async function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'darwin');
        setLoading(true);
        const res = await fetch(
            '	https://api.cloudinary.com/v1_1/reactjs-fileupload/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false)
    }
    function onHandleChangeEdit(e) {
        const { name, value } = e.target;
        setCurrentPhoto({
            ...currentPhoto,
            [name]: value
        })
    }

    function onHandleSubmit(data) {
        // console.log(data)
        const DataPhoto = {
            'id': currentPhoto.id,
            'namePhoto': data.namePhoto,
            'image': image,
            'author': data.author,
            'price': Number(data.price),
            'desc': data.desc,
            'detail': data.detail,
            'categoryId': data.categoryId
        }
        setTimeout(() => {
            dispatch(editPhoto(DataPhoto))
            history.push('/admin/photo');
        }, 1500);
    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="form-group">
                        <label htmlFor="">Tên photo <span style={{ color: 'red' }}><small>*</small></span></label>
                        <input
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.namePhoto}
                            type="text"
                            name="namePhoto"
                            className="form-control"
                            ref={register({ required: true })}
                        />
                        <small className="text-danger">{errors.namePhoto && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Ảnh đại diện <span style={{ color: 'red' }}><small>*</small></span></label>
                        <input
                            type="file"
                            name="image"
                            onChange={uploadImage}
                            className="form-control"
                        />
                    </div>
                    {
                        loading ? (
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>

                        ) : (
                                <img src={image} style={{ width: "300px" }} />
                            )
                    }

                    <div className="form-group">
                        <label htmlFor="">Danh mục <span style={{ color: 'red' }}><small>*</small></span></label>
                        <select
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.categoryId}
                            class="form-control"
                            name="categoryId"
                            className="form-control"
                            ref={register({ required: true })}>
                            <option value="">--- Mời bạn chọn danh mục photo ---</option>
                            {
                                categories.map((category) =>
                                    <option value={category.id}>{category.nameCategory}</option>
                                )
                            }
                        </select>
                        <small className="text-danger">{errors.categoryProductId && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Tác giả <span style={{ color: 'red' }}><small>*</small></span></label>
                        <input
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.author}
                            type="text"
                            name="author"
                            className="form-control"
                            ref={register({ required: true })}
                        />
                        <small className="text-danger">{errors.author && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Giá tiền <span style={{ color: 'red' }}><small>*</small></span></label>
                        <input
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.price}
                            type="number"
                            name="price"
                            className="form-control"
                            ref={register({ required: true })}
                        />
                        <small className="text-danger">{errors.price && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}><small>*</small></span></label>
                        <textarea
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.desc}
                            name="desc"
                            className="form-control"
                            ref={register({ required: true })}
                        ></textarea>
                        <small className="text-danger">{errors.desc && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Chi tiết <span style={{ color: 'red' }}><small>*</small></span></label>
                        <textarea
                            onChange={onHandleChangeEdit}
                            value={currentPhoto.detail}
                            name="detail"
                            className="form-control"
                            ref={register({ required: true })}
                        ></textarea>
                        <small className="text-danger">{errors.detail && <span>Không được bỏ trống trường này</span>}</small>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {handleSubmit && <div class="spinner-border text-primary spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>}
                Cập nhật</button>
                </form>
            </div>
        </div>
    );
}

export default EditPagePhoto;