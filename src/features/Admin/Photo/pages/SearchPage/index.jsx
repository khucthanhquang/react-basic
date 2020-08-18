import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import PhotoCard from '../../components/PhotoCard';

SearchPage.propTypes = {

};
function SearchPage(props) {
    const dataSearch = useSelector(state => state.photo.valueSearch);
    return (
        <div className="card card-solid">
            <div className="card-header">
                <h3 className="card-title" style={{ float: 'left', fontWeight: 'bold' }}>Danh sách photo search</h3>
            </div>
            <div className="card-body pb-0">
                <div className="row">
                    {
                        dataSearch.length > 0 ? (dataSearch.map(photo => (
                            <PhotoCard
                                photo={photo}
                            />
                        ))) : ('Không thấy kết quả tìm kiếm !')
                    }
                </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
                {/* <nav aria-label="Contacts Page Navigation">
                    <ul className="pagination justify-content-center m-0">
                        {
                            pagination.map(p => (
                                p
                            ))
                        }
                    </ul>
                </nav> */}
            </div>
            {/* /.card-footer */}
        </div>

    );
}

export default SearchPage;