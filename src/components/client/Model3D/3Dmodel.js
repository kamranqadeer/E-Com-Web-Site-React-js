import React, { Component } from "react";
import { Tick, MTLModel } from "react-3d-viewer";
import mtl from "../Model3D/model5_2.mtl";
import obj from "../Model3D/model5_2.OBJ";
import tex from "../Model3D/model5_2.png";
import { MDBCard } from "mdbreact";
class Model3D extends Component {
  state = {
    tick: this
  };
  componentWillMount() {
    this.state.tick.animate = false;
  }
  componentDidMount() {
    this.state.tick = Tick(() => {
      var { rotation } = this.state;
      this.setState({ rotation });
    });
  }
  render() {
    return (
      <MDBCard>
        <MTLModel
          color="transparant"
          enableZoom={true}
          height="600"
          width="300"
          bottom
          position={{ x: 0, y: 90, z: -100 }}
          rotation={this.state.rotation}
          texPath={tex}
          mtl={mtl}
          src={obj}
        />
      </MDBCard>
    );
  }
}

export default Model3D;
