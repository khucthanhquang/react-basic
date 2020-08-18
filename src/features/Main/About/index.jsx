import React from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

About.propTypes = {

};

function About(props) {
    return (
        <MDBContainer>

            <MDBBreadcrumb light style={{ backgroundColor: '#2BBBAD', color: '#fff' }}>
                <MDBBreadcrumbItem iconRegular icon="star">Trang chủ</MDBBreadcrumbItem>
                <MDBBreadcrumbItem iconRegular icon="star">Liên hệ</MDBBreadcrumbItem>
            </MDBBreadcrumb>
            <MDBRow>
                <div className="col-lg-6">
                    <img className="img-fluid rounded mb-4" style={{height: "300px"}} src="https://kenh14cdn.com/thumb_w/640/2017/1502796015952-57-202-657-1162-crop-1502796034469.jpg" alt="" />
                </div>
                <div className="col-lg-6">
                    <h2>Về chúng tôi</h2>
                    <p>Cao đẳng thực hành FPT Polytechnic triển khai mô hình giáo dục - đào tạo kiểu mới dựa trên sức mạnh của công nghệ thông tin. Đó là: "Thực học – Thực nghiệp", đào tạo thông qua dự án với cách thức "cầm tay chỉ việc". Đây là một trong những phương pháp đào tạo tiên tiến nhất hiện nay và còn mới lạ ở Việt Nam</p>
                </div>
            </MDBRow>

            <MDBRow>
                <div className="col-lg-4 mb-4">
                    <div className="card h-100 text-center">
                        <img className="card-img-top" src="https://caodang.fpt.edu.vn/wp-content/uploads/87104554_2870617879663960_7616087389408067584_o-770x500.jpg" alt="" />
                        <div className="card-body">
                            <h4 className="card-title">Ong Poly – Linh vật của người FPT Polytechnic</h4>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text"><small>Cao đẳng FPT Polytechnic Hà Nội đã chính thức đi vào hoạt động tại cơ sở Trịnh Văn Bô, Nam Từ Liêm, Hà Nội từ những ngày cuối năm 2019 …</small></p>
                        </div>

                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card h-100 text-center">
                        <img className="card-img-top" src="https://caodang.fpt.edu.vn/wp-content/uploads/IMG_0329-768x512.jpg" alt="" />
                        <div className="card-body">
                            <h4 className="card-title">Tiết lộ 4 “Vũ khí đặc biệt” giúp sinh viên FPoly ghi điểm với nhà tuyển dụng</h4>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text"><small>Cao đẳng FPT Polytechnic Hà Nội đã chính thức đi vào hoạt động tại cơ sở Trịnh Văn Bô, Nam Từ Liêm, Hà Nội từ những ngày cuối năm 2019 …</small></p>
                        </div>

                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card h-100 text-center">
                        <img className="card-img-top" src="https://caodang.fpt.edu.vn/wp-content/uploads/IMG_0210-768x512.jpg" alt="" />
                        <div className="card-body">
                            <h4 className="card-title">Hơn 200 tân sinh viên FPoly Hà Nội tham gia tuần lễ định hướng</h4>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text"><small>Sáng ngày 24/7 tại Cao đẳng FPT Polytechnic Hà Nội đã tổ chức tuần lễ định hướng chào mừng hơn 200 sinh viên nhập học đợt 3.</small></p>
                        </div>

                    </div>
                </div>
            </MDBRow>

        </MDBContainer>
    );
}

export default About;