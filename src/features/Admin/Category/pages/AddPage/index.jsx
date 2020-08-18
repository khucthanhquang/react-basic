import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addCategories } from '../../categorySlice'

AddEditPage.propTypes = {

};

function AddEditPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
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

    function onHandleSubmit(data) {
        const newData = data;
        newData.image = image;
        setTimeout(() => {
            dispatch(addCategories(newData))
            history.push('/admin/category');
        }, 1000);
    }

    return (
        <div className="container">
            <form className="w-50" onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="form-group">
                    <label htmlFor="productName">Tên danh mục <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="text"
                        name="nameCategory"
                        className="form-control"
                        ref={register({ required: true, pattern: /^[A-Za-z]/i, })}
                    />
                    <small className="text-danger">{errors.nameCategory && <span>Bắt buộc phải nhập và không chứa kí tự đặc biệt !</span>}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Ảnh đại diện <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="file"
                        name="image"
                        onChange={uploadImage}
                        className="form-control"
                        ref={register({ required: true })}
                    />
                    <small className="text-danger">{errors.image && <span>Không được bỏ trống trường này</span>}</small>
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
                    <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="text"
                        name="descCategory"
                        className="form-control"
                        ref={register({ required: true, pattern: /^[A-Za-z]/i, })}
                    />
                    <small className="text-danger">{errors.descCategory && <span>Bắt buộc phải nhập và không chứa kí tự đặc biệt !</span>}</small>
                </div>
                <button type="submit" className="btn btn-primary">
                    {handleSubmit && <div className="spinner-border text-primary spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                            Thêm danh mục</button>
            </form>
        </div>
    );
}

export default AddEditPage;