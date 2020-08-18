import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from "mdbreact";
import { useSelector } from 'react-redux';

function DetailBlog(props) {
    const { idBlog } = useParams();
    const allPost = useSelector(state => state.posts.posts);
    const currentBlog = allPost.find(post => post.id == idBlog);
    return (
        <MDBContainer>
            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Blog</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Chi tiết</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <MDBCard style={{ width: "100%" }}>
                <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: currentBlog.content }}>

                    </div>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default DetailBlog;