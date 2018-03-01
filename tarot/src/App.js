import React, { Component } from 'react';
import chatIcon from './imgs/chat-icon.png';
import ouijiIcon from './imgs/ouiji-icon.png';
import cardsIcon from './imgs/cards-icon.png';
import altarIcon from './imgs/altar-icon.png';
import './App.css';
import Stickers from './comp/sticker/Stickers.js';
import Chat from './comp/chat/Chat.js';
import { Container, Row, Col } from 'reactstrap';


class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        }
        
    this.changeTab = this.changeTab.bind(this);
    }
    changeTab(data){
        this.setState({
            tab:data
        })
    }
  render() {
    var comp = null;
      
    if(this.state.tab === 1){
        comp = (
        <Chat />
        )
    } else if(this.state.tab === 2){
        comp = (
        <div>Ouija</div>
        )
    } else if(this.state.tab === 3){
        comp = (
        <Stickers />
        )
    } else if(this.state.tab === 4){
        comp = (
        <div>Tarot</div>
        )
    }
    return (
      <div className="App">
        
        <Container id="nav-container" fluid>
            <Row>   
                <Col xs="3">
                    <img className="img-fluid" src={chatIcon} alt="chat-icon" onClick={()=>{this.changeTab(1)}}/>
                    <h5>Chat</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={ouijiIcon} alt="ouiji-icon" onClick={()=>{this.changeTab(2)}}/>
                    <h5>Ouija</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={altarIcon} alt="altar-icon" onClick={()=>{this.changeTab(3)}}/>
                    <h5>Stickers</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={cardsIcon} alt="tarot-icon" onClick={()=>{this.changeTab(4)}}/>
                    <h5>Tarot</h5>
                </Col>
            </Row>
        </Container>

        <br />
                        
        <Container>
            <Row>
                <Col xs="12">
                    <div>
                        <h1 className="App-title">fortune teller</h1>
                        {comp}
                    </div>
                </Col>
            </Row>
        </Container>

      </div> 
    );
  }
}

export default App;
