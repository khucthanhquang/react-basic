import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchPhotos, fetchPhotosPagination, fetchPhotosSearch } from '../../Admin/Photo/photoSlice'
import PhotoCard from './components/PhotoCard';

Photo.propTypes = {

};

function Photo(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const photos = useSelector(state => state.photo.photos);

    const categories = useSelector(state => state.category.categories);
    // HÀM XỬ LÝ PHÂN TRANG
    const limitPage = Math.trunc(photos.length / 4);
    const photosPagination = useSelector(state => state.photo.paginationPhoto);
    const [page, setPage] = useState(1);

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(fetchPhotosPagination(page))
    }, [page])

    useEffect(() => {
        dispatch(fetchPhotosSearch(searchValue))
    }, [searchValue])



    function onHandleChangPage(currentPage) {
        setPage(currentPage)
    }

    var pagination = [];
    for (let i = 0; i <= limitPage; i++) {
        pagination.push(<li className="page-item"><button className="page-link" onClick={() => onHandleChangPage(i + 1)}>{i + 1}</button></li>);
    }
    // HÀM XỬ LÝ PHÂN TRANG

    // HÀM XỬ LÝ SEARCH
    function changeSearch(e) {
        if (e.target.value == '') return;
        setSearchValue(e.target.value);
    }
    function handleClickSearch() {
        // if (searchValue == '') return;
        // setTimeout(() => {
        //     history.push('/admin/search_api')
        // }, 500);
    }
    return (
        <div>
            {/* Page Heading/Breadcrumbs */}
            <h1 className="mt-4 mb-3">
            </h1>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="javascript:void()">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active">Photo Album</li>
            </ol>
            <div className="row">
                <div className="col-md-7">

                    {
                        photosPagination.map(photo => (
                            <PhotoCard
                                photo={photo}
                            />
                        ))
                    }

                    {/* Pagination */}
                    <ul className="pagination justify-content-center mb-4">
                        {
                            pagination.map(p => (
                                p
                            ))
                        }
                    </ul>
                </div>
                {/* Sidebar Widgets Column */}
                <div className="col-md-5">

                    <div className="card mb-4">
                        <h5 className="card-header">Tìm kiếm</h5>
                        <div className="card-body">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..." />
                                <span className="input-group-append">
                                    <button className="btn btn-secondary" type="button">Tìm kiếm!</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Categories Widget */}
                    <div className="card my-4">
                        <h5 className="card-header">Danh mục</h5>
                        <div className="card-body">
                            <div className="row">
                                {
                                    categories.map(category => (
                                        <div className="col-md-3">
                                            <button className="btn btn-success">{category.nameCategory}</button>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Photo;