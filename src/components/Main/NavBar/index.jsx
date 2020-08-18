import React from 'react';
import { MDBBadge, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar(props) {
    const bgPink = { backgroundColor: '#2BBBAD' };
    const cart = useSelector(state => state.cart.cart);
 
    var count;
    if (cart == null) {
        count = 0;
    } else {
        count = cart.length
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
                            <MDBNavLink to="/photo">Photo Album</MDBNavLink>
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
                            <MDBNavLink to="#"><MDBIcon icon="sign-in-alt" /></MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
    );
}

export default NavBar;