import React from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBBadge, MDBView, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Blog(props) {
    const history = useHistory();
    const fetchAllPost = useSelector(state => state.posts.posts);
    const fetchAllCategoryPost = useSelector(state => state.post_category.categories);

    function redirectToDetailBlog(id){
        history.push(`/blog/${id}`);
    }
    return (
        <MDBContainer>

            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Blog</MDBBreadcrumbItem>
            </MDBBreadcrumb>

            <MDBCard className="my-5">
                <MDBCardBody>
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Bài viết gần đây
                    </h2>
                    <hr className="my-5" />
                    {
                        fetchAllPost.map((post, index) => (
                            <div>
                                <MDBRow key={index} style={{ textAlign: 'justify' }}>
                                    <MDBCol lg="5" xl="4">
                                        <MDBView hover className="rounded z-depth-1-half mb-lg-0 mb-4">
                                            <img
                                                className="img-fluid"
                                                src={post.image}
                                                alt=""
                                            />
                                            <a href="#!">
                                                <MDBMask overlay="white-slight" />
                                            </a>
                                        </MDBView>
                                    </MDBCol>
                                    <MDBCol lg="7" xl="8">
                                        <h3 className="font-weight-bold mb-3 p-0">
                                            <strong>{post.tittle}</strong>
                                        </h3>
                                        <MDBBadge pill color="default" className="ml-2">
                                            {
                                                fetchAllCategoryPost.map((cate) => (
                                                    cate.id == post.post_categoryId ? cate.nameCategory : ''
                                                ))
                                            }
                                        </MDBBadge>
                                        <p className="dark-grey-text" dangerouslySetInnerHTML={{ __html: post.desc }}>
                                        </p>
                                        <p>
                                            by <a href="#!" className="font-weight-bold">Admin</a>, {post.published}
                                        </p>
                                        <MDBBtn color="primary" size="md" onClick={() => redirectToDetailBlog(post.id)}>
                                            Đọc tiếp
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <hr className="my-5" />
                            </div>
                        ))
                    }


                </MDBCardBody>
            </MDBCard>
        </MDBContainer >
    );
}

export default Blog;