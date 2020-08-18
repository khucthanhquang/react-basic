import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBContainer, MDBRow, MDBIcon, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBAnimation, MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import { useEffect } from 'react';
import { getItemToStorage } from '../../../cartSlice'
import { useHistory } from 'react-router-dom';
import { fetchPhotosSearch, filterPrice } from '../../../../Admin/Photo/photoSlice';



function Tab(props) {

    const [valueSearch, setValueSearch] = useState('');

    useEffect(() => {
        dispatch(fetchPhotosSearch(valueSearch))
    }, [valueSearch]);

    const categories = useSelector(state => state.category.categories);
    const photos = useSelector(state => state.photo.photos);

    const [dataPhoto, setDataPhoto] = useState(photos);
    const history = useHistory();

    const [item, setAddItemsToStore] = useState({});

    const [isAddItem, setIsAddItem] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const updateCartbeforeAdd = async () => {
            dispatch(getItemToStorage())
        }
        updateCartbeforeAdd()
    }, [item]);

    function handleSelectOne(id) {
        const newData = [...photos];
        const newPhotoArr = [];
        for (let i = 0; i < newData.length; i++) {
            // console.log(photos[i])
            if (newData[i].categoryId == id) {
                newPhotoArr.push(newData[i])
            }
        }
        setDataPhoto(newPhotoArr)
    }

    function handleSelectAll() {
        setDataPhoto(photos)
    }

    // XỬ LÝ GIỎ HÀNG
    const keyLocalStorage = 'CartStorage';
    const allPhoto = useSelector(state => state.photo.photos);
    function addToCart(id) {
        var danhSachSanPhamGioHang = layDanhSachSanPham();
        var checkIsset = false;
        setIsAddItem(true)
        setTimeout(() => {
            setIsAddItem(false)
        }, 2000);

        // Kiem tra xem co ton tai trong gio hang khong
        for (let i = 0; i < danhSachSanPhamGioHang.length; i++) {
            const sanPhamHienTai = danhSachSanPhamGioHang[i];
            if (sanPhamHienTai.id == id) {
                sanPhamHienTai.quantity = sanPhamHienTai.quantity + 1;
                checkIsset = true;
            }
        }
        /* Neu san pham chua ton tai trong gio hang
         ====> tao 1 doi tuong moi va push vao gio hang */
        const photoFind = allPhoto.find(x => x.id == id);
        const newPhotoFind = { ...photoFind, ...{ "quantity": 1 } };
        if (checkIsset == false) {
            danhSachSanPhamGioHang.push(newPhotoFind);
            setAddItemsToStore(newPhotoFind);
        }

        // Lưu danh sách sản phẩm
        luuDanhSachSanPhamVaoLocal(danhSachSanPhamGioHang);
    }

    function layDanhSachSanPham() {
        let danhSachSanPham = new Array();
        let jsondanhSachSanPham = localStorage.getItem(keyLocalStorage);

        if (jsondanhSachSanPham != null)
            danhSachSanPham = JSON.parse(jsondanhSachSanPham)
        return danhSachSanPham;
    }
    // Lưu danh sách giỏ hàng lên localStỏage
    function luuDanhSachSanPhamVaoLocal(danhSachSanPham) {
        // 1. Chuyển thành chuỗi Json
        let jsonDanhsachSanPham = JSON.stringify(danhSachSanPham);
        // 2. Lưu vào LOcalStỏage
        localStorage.setItem(keyLocalStorage, jsonDanhsachSanPham);
    }
    function detailPhoto(id) {
        history.push(`/photo/${id}`);
    }

    // SEARCH
    const resValueSearch = useSelector(state => state.photo.valueSearch);
    function fullTextSearch(e) {
        let search = e.target.value;
        setValueSearch(search);
        if (search == '') { setDataPhoto(photos) }
        else { setDataPhoto(resValueSearch) }

    }
    // FILTER
    useEffect(() => {
        const filterPriceRes = async () => {
            dispatch(filterPrice())
        }
        filterPriceRes()
    }, []);
    const photosFilterPrice = useSelector(state => state.photo.photosFilterPrice);

    function handleChangeFilter(e) {
        let value = e.target.value;
        // Sắp xếp theo tên - từ Z-A do mặc định là A-Z
        let newPhotos = [...photos];
        let photoReverse = newPhotos.reverse();
        // Sắp xếp theo giá giảm dần 
        let newPhotosPrice = [...photosFilterPrice];
        let photoReversePrice = newPhotosPrice.reverse()
        switch (value) {
            case 'za':
                setDataPhoto(photoReverse)
                break;
            case 'az':
                setDataPhoto(photos)
                break;
            case 'priceUp':
                setDataPhoto(photosFilterPrice)
                break;
            case 'priceDown':
                setDataPhoto(photoReversePrice)
                break;
            default:
        }

    }
    return (
        <MDBContainer>
            <MDBCard className="pb-1 pt-3 pl-2 pr-2">
                <MDBRow>
                    <MDBCol md="4">
                        <input onChange={fullTextSearch} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </MDBCol>
                    <MDBCol md="4" style={{ paddingLeft: '6rem' }}>
                        <MDBPagination>
                            <MDBPageItem>
                                <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav>
                                    1
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem>
                                <MDBPageNav aria-label="Previous">
                                    <span aria-hidden="true">&raquo;</span>
                                </MDBPageNav>
                            </MDBPageItem>
                        </MDBPagination>
                    </MDBCol>
                    <MDBCol md="4">
                        <select className="browser-default custom-select" onChange={handleChangeFilter}>
                            <option>---------- Sắp xếp ----------</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                            <option value="priceUp">Giá tăng dần</option>
                            <option value="priceDown">Giá giảm dần</option>
                        </select>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
            {
                isAddItem ? (
                    <MDBAnimation type="bounce" infinite>
                        <MDBBtn color="success">Thêm sản phẩm thành công ! <strong>Vui lòng kiểm tra giỏ hàng</strong></MDBBtn>
                    </MDBAnimation>

                ) : ''
            }
            <MDBCard className="pb-3 pt-3">
                <MDBRow>
                    <MDBCol md="2">
                        <MDBBtn size="md" color="default" onClick={handleSelectAll}>Tất cả</MDBBtn>
                    </MDBCol>
                    {
                        categories.map((category, index) => (
                            <MDBCol md="2" key={index}>
                                <MDBBtn size="md" color="indigo" onClick={() => handleSelectOne(category.id)}>{category.nameCategory}</MDBBtn>
                            </MDBCol>

                        ))
                    }
                </MDBRow>
            </MDBCard>
            <MDBRow className="mt-2">
                {
                    dataPhoto.map((photo, index) => (
                        <MDBCol md="4" key={index}>
                            <MDBCard>
                                <MDBCardImage className="img-fluid" src={photo.image}
                                    waves />
                                <MDBCardBody>
                                    <MDBCardTitle>{photo.namePhoto}</MDBCardTitle>
                                    <MDBCardText className="font-italic"><i>{photo.desc}</i></MDBCardText>
                                    <MDBCardText><strong>{Number(photo.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</strong></MDBCardText>
                                    <MDBBtn size="md" onClick={() => detailPhoto(photo.id)}>Tải về <MDBIcon icon="cloud-download-alt" className="ml-2" /></MDBBtn>
                                    <MDBBtn size="md" color="indigo" onClick={() => addToCart(photo.id)}>Thêm vào giỏ<MDBIcon icon="shopping-basket" className="ml-2" /></MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ))
                }
            </MDBRow>
        </MDBContainer>
    )
}

export default Tab;