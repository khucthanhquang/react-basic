import React from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardTitle, MDBCardImage, MDBCardBody, MDBCardText } from "mdbreact";


function Footer(props) {
    return (
        <MDBJumbotron className="text-center rainy-ashville-gradient
        ">
            <MDBCardBody>
                <MDBCardText>
                    Mọi thắc mắc liên hệ quangktph07731@fpt.edu.vn
                </MDBCardText>

                <MDBCol className="d-flex justify-content-center mt-4" md="12">
                    <MDBCol md="2" className="d-flex justify-content-around">
                        <a href="#"><MDBIcon
                            fab
                            icon="linkedin-in"
                            className="grey-text"
                            size="lg"
                        /></a>
                        <a href="#"><MDBIcon
                            fab
                            icon="twitter"
                            className="grey-text"
                            size="lg"
                        /></a>
                        <a href="#"><MDBIcon
                            fab
                            icon="facebook-f"
                            className="grey-text"
                            size="lg"
                        /></a>
                    </MDBCol>
                </MDBCol>

            </MDBCardBody>
        </MDBJumbotron>
    )
}

export default Footer;