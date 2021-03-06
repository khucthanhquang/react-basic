import firebase from 'firebase';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBJumbotron, MDBRow } from "mdbreact";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import apiRequestCategories from '../../../api/categoriesApi';
import { updateAcount } from '../../Auth/authSlice'


function DetailPhoto(props) {
    const photoData = useSelector(state => state.photo.photos);
    const [nearPhoto, setNearPhoto] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const currentPhoto = photoData.find(photo => photo.id == id);

    const cateId = currentPhoto.categoryId;

    useEffect(() => {
        const getPhotobyIdCate = async () => {
            try {
                // data kia là dùng arrow func + detructuring
                const { data } = await apiRequestCategories.get(cateId);
                setTimeout(() => {
                    setNearPhoto(data)
                }, 200);
            } catch (error) {
                console.log(error)
            }
        }
        getPhotobyIdCate()
    }, [cateId]);
    function detailPhoto(id) {
        history.push(`/photo/${id}`);
    }

    // Check login before dowload

    const myAcount = useSelector(state => state.auth.user);

    function CheckLogin(link) {
        if (firebase.auth().currentUser == null) {
            let cf = window.confirm('Để tải về máy bạn cần đăng nhập?')
            if (cf) {
                history.push('/login');
            }
        } else {
            setModal(!modal);
        }
    }
    function FinishCheckOut(link) {
        const newMyAcount = { ...myAcount };
        const newAmount = Number(newMyAcount.amount) - Number(currentPhoto.price);

        newMyAcount.amount = newAmount;

        // Tạo thêm 1 obj để lưu lịch sử
        const objHistory = {
            detail: `Bạn vừa mua thành công ảnh với giá ${currentPhoto.price} vnđ`,
            usersId: newMyAcount.id
        }
        setTimeout(() => {
            if (dispatch(updateAcount(objHistory, newMyAcount))) {
                alert('Thành Công !');
                setModal(!modal);
                var element = document.createElement("a");
                var file = new Blob(
                    [
                        link
                    ],
                    { type: "image/*" }
                );
                element.href = URL.createObjectURL(file);
                element.download = `image${Math.trunc(Math.random() * 100000)}.jpg`;
                element.click();
            }
        }, 500);

    }

    return (
        <div className="container">

            {/* MODAL THANH TOÁN */}

            <MDBModal isOpen={modal} toggle={CheckLogin}>
                <MDBModalHeader toggle={CheckLogin}>Thông tin tải xuống</MDBModalHeader>
                <MDBModalBody>
                    <MDBBtn color="primary" size="sm">Số dư: {Number(myAcount.amount).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</MDBBtn> -
                    <MDBBtn color="primary" size="sm">Đơn giá: {Number(currentPhoto.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</MDBBtn> =
                    <MDBBtn color="danger" size="sm">Còn lại: {Number(myAcount.amount - currentPhoto.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</MDBBtn>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="success" onClick={FinishCheckOut}>Thanh toán</MDBBtn>
                </MDBModalFooter>
            </MDBModal>



            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <div className="row">
                <div className="col-md-7">
                    <img src={currentPhoto.image} className="img-thumbnail"
                        width="100%" style={{ height: '500px' }}></img>
                </div>

                <div className="col-md-5" style={{ textAlign: "justify" }}>
                    <MDBJumbotron style={{ padding: '30px' }}>
                        <div className="list-group-flush">
                            <div className="list-group-item">
                                <p className="mb-0">
                                    <i className="far fa-image mr-4 blue p-3 white-text rounded " aria-hidden="true"></i>
                                    <strong>{currentPhoto.namePhoto}</strong></p>
                            </div>
                            <div className="list-group-item">
                                <p className="mb-0 text-danger" style={{ fontWeight: 'bold' }}>
                                    <i className="far fa-money-bill-alt mr-4 mr-4 red p-3 white-text rounded" aria-hidden="true"></i>
                                    {Number(currentPhoto.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</p>
                            </div>

                            <div className="list-group-item">
                                <p className="mb-0"><i className="fas fa-user-tag mr-4 mr-4 purple p-3 white-text rounded" aria-hidden="true"></i>
                                    {currentPhoto.author}</p>
                            </div>
                        </div>
                    </MDBJumbotron>

                    <MDBJumbotron style={{ padding: '30px' }}>
                        <p className="lead">
                            <small>{currentPhoto.detail}.</small>
                        </p>
                        <hr className="my-2" />

                        <MDBBtn size="md" onClick={() => CheckLogin(currentPhoto.image)}>Tải về ngay<MDBIcon icon="cloud-download-alt" className="ml-2" /></MDBBtn>
                    </MDBJumbotron>
                </div>
            </div>


            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff', marginTop: '20px' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Ảnh cùng loại</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBRow className="mt-2">
                {
                    nearPhoto.map((photo, index) => (
                        <MDBCol md="4">
                            <MDBCard>
                                <MDBCardImage className="img-fluid" src={photo.image}
                                    waves />
                                <MDBCardBody>
                                    <MDBCardTitle>{photo.namePhoto}</MDBCardTitle>
                                    <MDBCardText className="font-italic"><i>{photo.desc}</i></MDBCardText>
                                    <MDBCardText><strong>{Number(photo.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</strong></MDBCardText>
                                    <MDBBtn size="md" onClick={() => detailPhoto(photo.id)}>Tải về <MDBIcon icon="cloud-download-alt" className="ml-2" /></MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))
                }
            </MDBRow>
        </div>

    );
}

export default DetailPhoto;