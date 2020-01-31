import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
class footer extends Component {
    state = {  }
    render() { 
        return (  
          <MDBFooter color="blue" className="font-small pt-4 footerClass">
          <MDBContainer fluid className="text-center text-md-left">
            <MDBRow>
              <MDBCol md="6">
                <h5 className="title">Darzi.com</h5>
                <p>
                  Darzi.com (joury to yahan banty hain)
                </p>
              </MDBCol>
              <MDBCol md="6">
                <h5 className="title">All about projects links</h5>
                <ul>
                  <li className="list-unstyled">
                    <a href="#!">Using firebase(https://console.firebase.google.com/project/apnadarzi007/database/firestore/data~2FOrders~2F1)</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">How to use this website (https://www.youtube.com)</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">MDB react (https://mdbootstrap.com/docs/react/modals/basic/)</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Ui Materials (https://material-ui.com/getting-started/installation/)</a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Orignal <a href="https://www.Darzi.com"> Darzi.com </a>
            </MDBContainer>
          </div>
        </MDBFooter>
        );
    }
}
 
export default footer;