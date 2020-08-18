import React, { useState } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { editPost } from '../../postsSlice';

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
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

function EditPage(props) {
    const { register, handleSubmit, errors } = useForm(); // Sử dụng hook form
    const history = useHistory();
    const dispatch = useDispatch();
    const { postId } = useParams();

    const posts = useSelector(state => state.posts.posts);
    const categories = useSelector(state => state.post_category.categories);
    const postEdit = posts.find(post => post.id == postId);

    const [currentPost, setCurrentPost] = useState(postEdit);

    const [image, setImage] = useState(currentPost.image);
    const [loading, setLoading] = useState(false);

    // Upload lên cloud
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

    // Chuyển html sang draft để render vào editor
    const blocksFromHtml = htmlToDraft(currentPost.content);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorStateResult = EditorState.createWithContent(contentState);
    // Chuyển html sang draft để render vào editor

    const [editorState, setEditorState] = useState(editorStateResult);

    function onEditorStateChange(editorState) {
        setEditorState(editorState);
    }

    function onHandleChangeEdit(e) {
        const { name, value } = e.target;
        setCurrentPost({
            ...currentPost,
            [name]: value
        })
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
        data.id = currentPost.id;
        const newData = data;
        setTimeout(() => {
            dispatch(editPost(newData))
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
                        onChange={onHandleChangeEdit}
                        value={currentPost.tittle}
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
                        value={currentPost.post_categoryId}
                        className="form-control"
                        name="post_categoryId"
                        className="form-control"
                        ref={register({ required: true })}>
                        <option value="">--- Mời bạn chọn danh mục photo ---</option>
                        {
                            categories.map((category) =>
                                <option key={category.id} value={category.id}>{category.nameCategory}</option>
                            )
                        }
                    </select>
                    <small className="text-danger">{errors.post_categoryId && <span>Không được bỏ trống trường này</span>}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="">Mô tả ngắn <span style={{ color: 'red' }}><small>*</small></span></label>
                    <input
                        onChange={onHandleChangeEdit}
                        value={currentPost.desc}
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