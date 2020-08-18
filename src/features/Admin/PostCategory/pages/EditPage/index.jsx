import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { editCategories } from '../../postCategorySlice'

function EditPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();
    const { categoryId } = useParams();

    const dataState = useSelector(state => state.post_category.categories);
    const dataEdit = dataState.find(cate => cate.id == categoryId);

    const [currentCategory, setCurrentCategory] = useState(dataEdit);

    function handleEditData(e) {
        const { name, value } = e.target;
        setCurrentCategory({
            ...currentCategory,
            [name]: value
        })
    }

    function onHandleSubmit(data) {
        setTimeout(() => {
            dispatch(editCategories(currentCategory))
            history.push('/admin/post-category');
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
                </div>

                <div className="form-group">
                    <label htmlFor="">Mô tả <span style={{ color: 'red' }}><small>*</small></span></label>
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