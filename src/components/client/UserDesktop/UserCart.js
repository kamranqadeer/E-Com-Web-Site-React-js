import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBBtn, MDBFooter } from "mdbreact";
class UserCart extends Component {
    state = {  }
    render() { 
        return (  
          <MDBContainer>
                      <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        User all CART informations
                      </h1>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Rem repellendus quasi fuga nesciunt dolorum nulla
                        magnam veniam sapiente, fugiat! Commodi sequi non animi
                        ea dolor molestiae iste.
                      </h6>
                      <MDBBtn color="white">Check out link</MDBBtn>
                      <MDBBtn outline color="white">
                        Learn More
                      </MDBBtn>
          </MDBContainer>
        );
    }
}
 
export default UserCart;