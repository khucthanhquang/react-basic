import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PhotoCard(props) {
    const { photo } = props;
    return (
        <div className="card mb-4">
            <img className="card-img-top" src={photo.image} style={{ width: '100%', height: '400px' }} />
            <div className="card-body">
                <h2 className="card-title" style={{ fontWeight: 'bold' }}>{photo.namePhoto}</h2><br />
                <ul>
                    <li className="text-danger" style={{ fontWeight: 'bold' }}>Giá tiền: {Number(photo.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</li>
                    <li>Mô tả ngắn: {photo.desc}</li>
                </ul>
                <p className="card-text"> {photo.detail}</p>
                <Link to={`/photo/${photo.id}`} className="btn btn-primary">Tải về →</Link>
            </div>
            <div className="card-footer text-muted">
                Tác giả: {photo.author}
            </div>
        </div>
    );
}

export default PhotoCard;