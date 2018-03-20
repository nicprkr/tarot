import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Rooms extends Component {
    
    constructor(props){
        super(props);
        
    }
    
  render() {
      
    return (
      <Container className="Rooms">
        <button onClick={this.props.handleDisplay.bind(this,"room1")}>Room1</button>
        <button onClick={this.props.handleDisplay.bind(this,"room2")}>Room2</button>
        <button onClick={this.props.handleDisplay.bind(this,"room3")}>Room3</button>
        <button onClick={this.props.handleDisplay.bind(this,"room4")}>Room4</button>
        <button onClick={this.props.handleDisplay.bind(this,"room5")}>Room5</button>
      </Container>
    );
  }
}

export default Rooms;
