import React from 'react';
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import Tab from './components/Tab';
// import { useSelector } from 'react-redux';


function HomePage(props) {
    return (
        <div>
            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <Tab
                
             />
        </div>
    );
}

export default HomePage;