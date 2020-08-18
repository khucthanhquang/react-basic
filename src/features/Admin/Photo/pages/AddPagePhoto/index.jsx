import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addPhoto } from '../../photoSlice'

function AddPagePhoto(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.category.categories);

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


    async function onHandleSubmit(data) {
        const newData = data;
        newData.image = image;
        newData.price = Number(data.price)
        await dispatch(addPhoto(newData));
        history.push('/admin/photo');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Tên photo <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
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
                    <label htmlFor="">Danh mục <span style={{ color: 'red' }}><small>*</small></span></label>
                    <select
                        className="form-control"
                        name="categoryId"
                        className="form-control"
                        ref={register({ required: true })}>
                        <option value="">--- Mời bạn chọn danh mục photo ---</option>
                        {
                            categories.map((category) =>
                                <option key={category.id} value={category.id}>{category.nameCategory}</option>
                            )
                        }
                    </select>
                    <small className="text-danger">{errors.categoryProductId && <span>Không được bỏ trống trường này</span>}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="">Tác giả <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="text"
                        name="author"
                        className="form-control"
                        ref={register({ required: true })}
                    />
                    <small className="text-danger">{errors.author && <span>Không được bỏ trống trường này</span>}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="productPrice">Giá tiền <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
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
                        name="desc"
                        className="form-control"
                        ref={register({ required: true })}
                    ></textarea>
                    <small className="text-danger">{errors.desc && <span>Không được bỏ trống trường này</span>}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="">Chi tiết <span style={{ color: 'red' }}><small>*</small></span></label>
                    <textarea
                        name="detail"
                        className="form-control"
                        ref={register({ required: true })}
                    ></textarea>
                    <small className="text-danger">{errors.detail && <span>Không được bỏ trống trường này</span>}</small>
                </div>

                <button type="submit" className="btn btn-primary">
                    {handleSubmit && <div className="spinner-border text-primary spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                Thêm photo</button>
            </form>
        </div>
    );
}

export default AddPagePhoto;