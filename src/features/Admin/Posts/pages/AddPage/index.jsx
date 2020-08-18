import React, { useState } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../../postsSlice';

// UploadImage Editor
function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                console.log(response)
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

function AddPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();

    const categories = useSelector(state => state.post_category.categories);

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    async function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'darwin');
        setLoading(true);
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/reactjs-fileupload/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false)
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    function onEditorStateChange(editorState) {
        setEditorState(editorState);

    }

    function onHandleSubmit(data) {
        // Lấy ngày tháng năm giờ hiện tại
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        data.image = image;
        data.published = dateTime;

        // Chuyen doi draft sang html de luu db
        data.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const newData = data;
        setTimeout(() => {
            dispatch(addPost(newData))
            history.push('/admin/posts');
        }, 1000);
    }

    return (
        <div className="container">
            {/* <textarea
                
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="form-group">
                    <label htmlFor="">Tiêu đề <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="text"
                        name="tittle"
                        className="form-control"
                        ref={register({ required: true })}
                    />
                    <small className="text-danger">{errors.tittle && <span>Không được bỏ trống trường này</span>}</small>
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
                        class="form-control"
                        name="post_categoryId"
                        className="form-control"
                        ref={register({ required: true })}>
                        <option value="">--- Mời bạn chọn danh mục photo ---</option>
                        {
                            categories.map((category) =>
                                <option value={category.id}>{category.nameCategory}</option>
                            )
                        }
                    </select>
                    <small className="text-danger">{errors.post_categoryId && <span>Không được bỏ trống trường này</span>}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        type="text"
                        name="desc"
                        className="form-control"
                        ref={register({ required: true })}
                    />
                    <small className="text-danger">{errors.desc && <span>Không được bỏ trống trường này</span>}</small>
                </div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: uploadImageCallBack, previewImage: true, alt: { present: true, mandatory: false }
                        },
                    }}
                />
                <br />
                {/* <textarea
                    disabled
                    value={draftToHtml(convertToRaw(valueEditor.getCurrentContent()))}
                /> */}
                <button type="submit" className="btn btn-primary">
                    {handleSubmit && <div class="spinner-border text-primary spinner-border-sm" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>}
                Đăng</button>
            </form>
        </div>
    );
}

export default AddPage;