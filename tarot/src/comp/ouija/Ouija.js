import React, { Component } from 'react';
import Pointer from './Pointer.js';
import './Ouija.css';
import mySocket from "socket.io-client";
import Ask from './Ask.js';
import Answer from './Answer.js';
import { Container, Row, Col } from 'reactstrap';

class Ouija extends Component {
    constructor(props){
        super(props);
        this.state = {
                tab:0
            }
    }

  render() {
    var comp = null;
      if(this.state.tab === 0){
          comp = (
            <Container>
                <Row>
                    <Col xs="12">
                        <div>Who are you?</div>
                    </Col>
                </Row>
              <br/>
                <Row>
                    <Col xs="12">
                        <div className="btn-group">
                        <button onClick={()=>{this.setState({ tab: 1})}} className="ghost-btns">Seeker</button>
                        <button onClick={()=>{this.setState({ tab: 2})}} className="ghost-btns" id="right">Spirit</button>
                        </div>
                    </Col>
              </Row>
        </Container>
          )
    } else if (this.state.tab === 1){
        comp = (
            <Ask />
          )
    } else if (this.state.tab === 2){
        comp = (
            <Answer />
          )
    }
    
    return (
      <div className="Ouija">
        {comp}
      </div>
    );
  }
}

export default Ouija;
