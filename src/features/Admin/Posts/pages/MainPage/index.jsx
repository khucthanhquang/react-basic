import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { removePost } from '../../postsSlice'


function CategoryList(props) {
    // Dispatch Action get Categories
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state.posts.posts);
    const post_category = useSelector(state => state.post_category.categories);
    // const photos = useSelector(state => state.photo.photos);

    // Dispatch Action delete Categories
    function handleRemovePost(data) {
        let cf = window.confirm('Bạn thực sự muốn xóa ?');
        if (cf) {
            setTimeout(() => {
                dispatch(removePost(data))
            }, 500);
        }
    }
    function handleEditCategory(data) {
        const editUrl = `/admin/posts/${data.id}`;
        setTimeout(() => {
            history.push(editUrl)
        }, 200);
    }
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title" style={{ float: 'left', fontWeight: 'bold' }}>
                        Danh sách danh mục
                    </h3>
                    <h3 className="card-title" style={{ float: 'right' }}>
                        <button className="btn btn-success">
                            <span className="spinner-grow spinner-grow-sm"></span>
                            <Link to="/admin/posts/add" className="text-white">Thêm mới</Link>
                        </button>
                    </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr >
                                <th style={{ width: '10px' }}>#</th>
                                <th>Tiêu đề</th>
                                <th>Ảnh đại diện</th>
                                <th>Ngày xuất bản</th>
                                <th>Danh mục</th>
                                <th style={{ width: '10%' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((post, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{post.tittle}</td>
                                        <td><a href={post.image}><img src={post.image} width="100" height="100" /></a></td>
                                        <td>{post.published}</td>
                                        <td>
                                            {
                                                post_category.map(category => (
                                                    category.id == post.post_categoryId ? category.nameCategory : ''
                                                ))
                                            }
                                        </td>
                                        <td>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-block btn-info btn-sm mr-1"
                                                        onClick={() => handleEditCategory(post)}>
                                                        <i className="far fa-edit"></i>
                                                    </button>
                                                </div>
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-block btn-danger btn-sm"
                                                        onClick={() => handleRemovePost(post)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
                {/* /.card-body */}
                <div className="card-footer clearfix">
                    <ul className="pagination pagination-sm m-0 float-right">
                        <li className="page-item"><a className="page-link" href="#">«</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">»</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default CategoryList;