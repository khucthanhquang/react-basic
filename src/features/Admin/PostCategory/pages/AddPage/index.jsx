import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addCategories } from '../../postCategorySlice'

;

function AddEditPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();


    function onHandleSubmit(data) {
        setTimeout(() => {
            dispatch(addCategories(data))
            history.push('/admin/post-category');
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
                    <label htmlFor="">Mô tả <span style={{ color: 'red' }}><small>*</small></span></label>
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