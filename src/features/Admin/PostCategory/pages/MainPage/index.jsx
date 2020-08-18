import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { removeCategories } from '../../postCategorySlice'


function CategoryList(props) {
    // Dispatch Action get Categories
    const dispatch = useDispatch();
    const history = useHistory();
    const data = useSelector(state => state.post_category.categories);
    // const photos = useSelector(state => state.photo.photos);

    // Dispatch Action delete Categories
    function handleRemoveCategory(data) {
        let cf = window.confirm('Bạn thực sự muốn xóa ?');
        if (cf) {
            setTimeout(() => {
                dispatch(removeCategories(data))
            }, 500);
        }
    }
    function handleEditCategory(data) {
        const editUrl = `/admin/post-category/${data.id}`;
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
                            <Link to="/admin/post-category/add" className="text-white">Thêm mới</Link>
                        </button>
                    </h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr >
                                <th style={{ width: '10px' }}>#</th>
                                <th>Tên danh mục</th>
                                <th>Mô tả</th>
                                {/* <th>Số lượng</th> */}
                                <th style={{ width: '10%' }}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((category, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.nameCategory}</td>
                                        <td>{category.descCategory}</td>
                                        <td>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-block btn-info btn-sm mr-1"
                                                        onClick={() => handleEditCategory(category)}>
                                                        <i className="far fa-edit"></i>
                                                    </button>
                                                </div>
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-block btn-danger btn-sm"
                                                        onClick={() => handleRemoveCategory(category)}>
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