import React from 'react';
import PropTypes from 'prop-types';
import { removePhoto } from '../../photoSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPhotosPagination } from '../../../../Admin/Photo/photoSlice';

PhotoCard.propTypes = {

};

function PhotoCard(props) {

    const { photo, page } = props;
    const categories = useSelector(state => state.category.categories);
    const [removeState, setRemoveState] = useState(false);

    useEffect(() => {
        dispatch(fetchPhotosPagination(page))
    }, [removeState])

    const dispatch = useDispatch();
    const history = useHistory();

    function handleRemovePhoto(id) {
        let cf = window.confirm('Bạn thực sự muốn xóa ?');
        if (cf) {
            setTimeout(() => {
                setRemoveState(id);
                dispatch(removePhoto(id));
            }, 1000);
        }
    }
    function handleEditPhoto(photo) {
        const editUrl = `/admin/photo/${photo.id}`;
        setTimeout(() => {
            history.push(editUrl)
        }, 200);
    }


    return (
        <div className="col-md-3">
            <div className="card bg-light">
                <div className="card-header text-muted border-bottom-0">

                </div>
                <div className="card-body pt-0">
                    <div className="row">
                        <div className="col-7">
                            <h2 className="lead"><b>{photo.namePhoto}</b></h2>
                            <p className="text-muted text-sm"><b><i className="fas fa-hand-holding-usd"></i> </b>{photo.price} VNĐ</p>
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                                <li className="small"><span className="fa-li"><i className="fas fa-tags"></i></span>{photo.author}</li>
                                <li className="small"><span className="fa-li"><i className="far fa-comment-dots"></i></span> {photo.desc}...</li>
                                <li className="small" style={{ fontWeight: 'bold' }}><span className="fa-li"><i className="nav-icon fas fa-th"></i></span>
                                    {
                                        categories.map(category => (
                                            category.id == photo.categoryId ? category.nameCategory : ''
                                        ))
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="col-5 text-center">
                            <img src={photo.image} alt="" className="img-fluid" style={{ width: '200px', height: '200px', borderRadius: '5px' }} />
                        </div>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="text-right">
                        <a href={photo.image} className="btn btn-sm bg-primary ">
                            <i className="fas fa-eye"></i>
                        </a>
                        <button
                            onClick={() => handleEditPhoto(photo)}
                            type="button"
                            className="btn btn-sm bg-info ml-1">
                            <i className="far fa-edit"></i>
                        </button>
                        <button
                            onClick={() => handleRemovePhoto(photo.id)}
                            type="button"
                            className="btn btn-sm btn-danger ml-1">
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhotoCard;