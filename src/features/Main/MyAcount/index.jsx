import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBBreadcrumb, MDBBreadcrumbItem, MDBTable, MDBTableHead, MDBTableBody, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { updateAcount } from '../../Auth/authSlice'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';


function MyAcount(props) {
    const myAcount = useSelector(state => state.auth.user);
    const [currentAmount, setCurrentAmount] = useState(myAcount.amount);
    const [historyAmount, setHistoryAmount] = useState([]);
    const [x, setX] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                history.push('/login')
            }
        })
        return () => unregisterAuthObserver();
    }, [])

    // Viết luôn ở đây cho nhanh :v
    useEffect(() => {
        async function fetchHistoryAcount() {
            try {
                // B1. Fetch du lieu
                const requestUrl = `http://localhost:3000/users/${myAcount.id}/history`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                // B2. Set lai data
                setHistoryAmount(responseJSON);
            } catch (error) {
                console.log(error)
            }
        }
        fetchHistoryAcount();
    }, [x]);

    function pushPriceToAcount() {
        const newMyAcount = { ...myAcount };
        const newAmount = Number(newMyAcount.amount) + Number(currentAmount);

        newMyAcount.amount = newAmount;

        // Tạo thêm 1 obj để lưu lịch sử
        const objHistory = {
            detail: `Bạn vừa nạp thành công thẻ nạp mệnh giá ${currentAmount} vnđ`,
            usersId: newMyAcount.id
        }
        if (x == '') return;
        setTimeout(() => {
            if (dispatch(updateAcount(objHistory, newMyAcount))) {
                alert('Thành Công !');
                setX('')
            }
        }, 500);
    }
    function handleChangeAmount(e) {
        // console.log(e.target.value)
        setCurrentAmount(e.target.value);
    }
    function handleCode(e) {
        setX(e.target.value)
    }

    return (
        <MDBContainer>
            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Tài khoản</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBRow>
                <MDBCol size="4">
                    <MDBCard>
                        <MDBCardHeader color="primary-color">Tài khoản của bạn</MDBCardHeader>
                        <MDBCardBody>
                            <MDBBtn color="deep-orange">{Number(myAcount.amount).toLocaleString('en-US', { style: 'currency', currency: 'VND' })}</MDBBtn>

                            <MDBCardText>
                                Nạp thêm tiền vào tài khoản.
                            </MDBCardText>

                            <select className="browser-default custom-select" onChange={handleChangeAmount}>
                                <option>Chọn mệnh giá thẻ cào</option>
                                <option value="50000">50.000 vnđ</option>
                                <option value="200000">200.000 vnđ</option>
                                <option value="500000">500.000 vnđ</option>
                            </select>
                            <MDBInput label="Nhập mã thẻ cào ?" value={x} onChange={handleCode} size="sm" /> <MDBBtn onClick={pushPriceToAcount}>Nạp ngay</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol size="8">
                    <MDBTable bordered>
                        <MDBTableHead color="primary-color" textWhite>
                            <tr>
                                <th>#</th>
                                <th>Lịch sử</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                historyAmount.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.detail}</td>
                                    </tr>
                                ))
                            }

                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default MyAcount;