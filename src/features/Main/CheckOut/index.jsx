import React, { useState, useEffect } from 'react';
import { MDBTable, MDBInput, MDBTableBody, MDBTableHead } from 'mdbreact';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBCardText, MDBCardTitle, MDBLink } from "mdbreact";
import { useSelector, useDispatch } from 'react-redux';

import { updateCart } from '../cartSlice';


function CheckOut(props) {

    let dataCart = useSelector(state => state.cart.cart);

    if (dataCart == null) { dataCart = [] }

    const [cart, setCart] = useState(dataCart);
    const dispatch = useDispatch();

    var totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += (cart[i].quantity * cart[i].price)
    }

    function handleChangeQuantity(newQuantity, index) {
        const newCart = [...cart];
        const quantity = newQuantity;
        newCart[index] = { ...newCart[index], quantity };
        if (quantity == 0) {
            newCart.splice(index, 1)
        }
        setCart(newCart);
    }

    useEffect(() => {
        dispatch(updateCart(cart))
    }, [cart])

    function RemoveItem(item) {
        let cf = window.confirm('Bạn có thực sự muốn xóa ?');
        if (cf) {
            const newCart = [...cart];
            const newCartFilter = newCart.filter(x => x.id != item.id);
            setCart(newCartFilter);
        }

    }

    return (
        <MDBContainer className="mt-5 text-center">
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron>
                        <MDBCardBody>
                            <MDBCardTitle className="h2">
                                Thanh toán
                             </MDBCardTitle>

                            <MDBCardText>
                                Thanh toán ngay với chúng tôi !.
                            </MDBCardText>
                            <MDBTable>
                                <MDBTableHead color="primary-color" textWhite>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên photo</th>
                                        <th>Ảnh</th>
                                        <th>Đơn giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Hành động</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>

                                    {
                                        cart.map((item, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{item.namePhoto}</th>
                                                <th><img src={item.image} style={{ width: '100px', height: '100px' }} /></th>
                                                <th>{Number(item.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</th>
                                                <th style={{ maxWidth: '50px', padding: 0, margin: 0 }}>
                                                    <MDBInput type="number" min="0" name="quantity" value={item.quantity} style={{ padding: 0, margin: 0 }}
                                                        onChange={(e) => handleChangeQuantity(e.target.value, index)} />
                                                </th>
                                                <th>{Number(item.quantity * item.price).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</th>
                                                <th><MDBBtn onClick={() => RemoveItem(item)} size="sm" color="danger"><MDBIcon icon="trash-alt" /></MDBBtn></th>
                                            </tr>
                                        ))
                                    }
                                </MDBTableBody>
                            </MDBTable>
                            <hr className="my-4" />
                            <MDBBtn color="success" size="lg">
                                Tổng: {Number(totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                            </MDBBtn>
                            <hr className="my-4" />
                            <div className="pt-2">
                                <MDBBtn
                                    color="primary"
                                    className="waves-effect"

                                >
                                    <MDBLink style={{ color: '#fff', padding: 0 }} to="/" >Tiếp tục mua sắm <MDBIcon far icon="gem" /></MDBLink>
                                </MDBBtn>
                                <MDBBtn
                                    outline
                                    color="primary"
                                    className="waves-effect"
                                >
                                    Download <MDBIcon icon="download" />
                                </MDBBtn>
                            </div>
                        </MDBCardBody>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default CheckOut;