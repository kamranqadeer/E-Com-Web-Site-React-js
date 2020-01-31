import React, { Component } from 'react';
import {  MDBCol, MDBNavbarBrand, MDBNavbar,MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from "mdbreact";
import kamran from '../assets/kamran.jpg'
class AdminAccount extends Component {
    state = {}
    render() {
        return (
            <div className="ChildContainer">
                <MDBCol md="12">
                    <MDBNavbar color="info-color" className="text-white darken-3" dark expand="md">
                        <MDBNavbarBrand>Admin : KAMRAN QADEER</MDBNavbarBrand>
                    </MDBNavbar>
                </MDBCol>
                <div className="ChildContainer">
                    <MDBRow>
                        <MDBCol xs="auto">
                            <MDBCard style={{ width: "22rem" }}>
                                <MDBCardImage className="img-fluid" src={kamran} waves />
                                <MDBCardBody>
                                    <MDBCardTitle>Card title</MDBCardTitle>
                                    <MDBCardText>
                                        Some quick example text to build on the card title and make
                                        up the bulk of the card&apos;s content.
                               </MDBCardText>
                                    <MDBBtn href="#">MDBBtn</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol>
                            <MDBTable>
                                <MDBTableHead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>ID</th>
                                        <th>CONTACT</th>
                                        <th>EMAIL</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}

export default AdminAccount;