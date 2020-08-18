import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { editCategories } from '../../categorySlice'

EditPage.propTypes = {

};

function EditPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();
    const { categoryId } = useParams();

    const dataState = useSelector(state => state.category.categories);
    const dataEdit = dataState.find(cate => cate.id == categoryId);

    const [currentCategory, setCurrentCategory] = useState(dataEdit);
    const [image, setImage] = useState(currentCategory.image);

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

    function handleEditData(e) {
        const { name, value } = e.target;
        setCurrentCategory({
            ...currentCategory,
            [name]: value
        })
    }

    function onHandleSubmit(data) {
        const DataCate = {
            'id': currentCategory.id,
            'nameCategory': data.nameCategory,
            'image': image,
            'descCategory': data.descCategory
        }
        setTimeout(() => {
            dispatch(editCategories(DataCate))
            history.push('/admin/category');
        }, 1000);
    }

    return (
        <div className="container">
            <form className="w-50" onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="form-group">
                    <label htmlFor="productName">Tên danh mục <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        value={currentCategory.nameCategory}
                        onChange={handleEditData}
                        type="text"
                        name="nameCategory"
                        className="form-control"
                        ref={register({ required: true, pattern: /^[A-Za-z]/i, })}
                    />
                    <small className="text-danger">{errors.nameCategory && <span>Bắt buộc phải nhập và không chứa kí tự đặc biệt !</span>}</small>
                </div><div className="form-group">
                    <label htmlFor="">Ảnh đại diện <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        // value={currentCategory.image}
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
                    <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        value={currentCategory.descCategory}
                        onChange={handleEditData}
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
                Cập nhật</button>
            </form>
        </div>
    );
}

export default EditPage;