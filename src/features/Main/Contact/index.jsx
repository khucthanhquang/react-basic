import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

function Contact(props) {
    return (
        <MDBContainer>
            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Liên hệ</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBRow>
                <MDBCol>
                    <iframe style={{ width: '100%', height: '400px', border: 0 }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558814596!2d105.74459841540242!3d21.038132792833117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIHRo4buxYyBow6BuaCBGUFQgUG9seXRlY2huaWMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1596580097734!5m2!1svi!2s" />
                </MDBCol>
            </MDBRow>
            <hr/>
            <MDBRow className="mb-4">
                <MDBCol md="6">
                    <form>
                        <div className="grey-text">
                            <MDBInput label="Tên của bạn" group type="text" validate error="wrong"
                                success="right" />
                            <MDBInput label="Email" group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Tiêu đề" group type="text" validate error="wrong" success="right" />
                            <MDBInput type="textarea" rows="3" label="Nội dung góp ý" />
                        </div>
                        <div className="text-center">
                            <MDBBtn outline color="success">
                                Gửi
                            <MDBIcon far icon="paper-plane" className="ml-1" />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
                <MDBCol md="6" style={{ textAlign: 'justify' }} className="mt-5">
                    <h3>Liên hệ với chúng tôi</h3>
                    <p>
                        Trường Cao đẳng thực hành FPT Polytechnic Hà Nội
                         </p>
                    <p>
                        Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội 100000, Việt Nam
                       </p>
                    <p>
                        +84981725836
                        </p>
                    <p>
                        https://caodang.fpt.edu.vn/
                      </p>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Contact;