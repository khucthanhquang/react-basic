import React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

function Header(props) {
    return (
        <MDBCarousel
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
        >
            <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src="https://fpcover.cdnpk.net/image/20200731024609.jpg"
                            alt="First slide"
                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src="https://fpcover.cdnpk.net/image/20200731024636.jpg"
                            alt="Second slide"
                        />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                    <MDBView>
                        <img
                            className="d-block w-100"
                            src="https://fpcover.cdnpk.net/image/20191115123221.jpg"
                            alt="Third slide"
                        />
                    </MDBView>
                </MDBCarouselItem>
            </MDBCarouselInner>
        </MDBCarousel>

    );
}

export default Header;