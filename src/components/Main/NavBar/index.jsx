import React from 'react';
import { MDBBadge, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setDataUserLogout } from '../../../features/Auth/authSlice'
import { useHistory } from 'react-router-dom';

function NavBar(props) {
    const bgPink = { backgroundColor: '#2BBBAD' };
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart);
    const userInfo = useSelector(state => state.auth.user);
    const history = useHistory()

    // Count photo in cart
    var count;
    if (cart == null) {
        count = 0;
    } else {
        count = cart.length
    }
    // Logout
    function handleSignOut() {
        if (userInfo) {
            let cf = window.confirm('Bạn muốn đăng xuất ?');
            if (cf) {
                firebase.auth().signOut();
                dispatch(setDataUserLogout());
                history.push('/')
            }
        }
    }


    return (
        <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top" >
                <MDBNavbarBrand href="/">

                </MDBNavbarBrand>
                <MDBNavbarToggler />
                <MDBCollapse navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Trang chủ</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/blog">Blog</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/about">Giới thiệu</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/contact">Liên hệ</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink to="/check-out">
                                <MDBBadge color="danger" className="mr-2">
                                    {count}
                                </MDBBadge>
                                <MDBIcon icon="shopping-basket" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            {userInfo ?
                                <MDBNavLink to="/my-acount">
                                    <MDBBadge color="green">
                                        <MDBIcon icon="user" /> {userInfo.displayName}
                                    </MDBBadge>
                                </MDBNavLink> : ''
                            }
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" onClick={handleSignOut}><MDBIcon icon="sign-in-alt" /></MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
    );
}

export default NavBar;