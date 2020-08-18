import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fetchPhotos, fetchPhotosPagination, fetchPhotosSearch } from '../../photoSlice'
import PhotoCard from '../../components/PhotoCard';



MainPagePhoto.propTypes = {

};

function MainPagePhoto(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const photos = useSelector(state => state.photo.photos);
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
        if (searchValue == '') return;
        setTimeout(() => {
            history.push('/admin/search_api')
        }, 500);
    }

    return (
        <div className="card card-solid">
            <div className="card-header">
                <h3 className="card-title" style={{ float: 'left', fontWeight: 'bold' }}>Danh sách photo</h3>
                <h3 className="card-title" style={{ float: 'right' }}>
                    <button className="btn btn-success">
                        <span className="spinner-grow spinner-grow-sm" />
                        <Link className="text-white" to="/admin/photo/add">Thêm mới</Link>
                    </button>
                </h3>
            </div>
            <div className="form-inline mt-2 ml-3">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={changeSearch} />
                <button className="btn btn-outline-success ml-2" onClick={handleClickSearch}>Tìm kiếm</button>
                {/* to="/admin/photo/api/s1" */}
            </div>
            <div className="card-body pb-0">
                <div className="row">
                    {
                        photosPagination.map(photo => (
                            <PhotoCard
                                photo={photo}
                            />
                        ))
                    }
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
                <nav aria-label="Contacts Page Navigation">
                    <ul className="pagination justify-content-center m-0">
                        {
                            pagination.map(p => (
                                p
                            ))
                        }
                    </ul>
                </nav>
            </div>
            {/* /.card-footer */}
        </div>

    );
}

export default MainPagePhoto;