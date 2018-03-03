import React, { Component } from 'react';
import chatIcon from './imgs/chat-icon.svg';
import ouijiIcon from './imgs/ouiji-icon.svg';
import cardsIcon from './imgs/cards-icon.svg';
import altarIcon from './imgs/altar-icon.svg';
import './App.css';
import Stickers from './comp/sticker/Stickers.js';
import Chat from './comp/chat/Chat.js';
import { Container, Row, Col } from 'reactstrap';


class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            tab: null
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
      
    if(this.state.tab === "chat"){
        comp = (
        <Chat />
        )
    } else if(this.state.tab === "ouiji"){
        comp = (
        <div>Ouija</div>
        )
    } else if(this.state.tab === "altar"){
        comp = (
        <Stickers />
        )
    } else if(this.state.tab === "tarot"){
        comp = (
        <div>Tarot</div>
        )
    }
    return (
      <div className="App">
        
        <Container id="nav-container" fluid>
            <Row> 

                <Col xs="3">
                    <img className="img-fluid" src={chatIcon} alt="chat-icon" onClick={()=>{this.changeTab("chat")}}/>
                    <h5>Chat</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={ouijiIcon} alt="ouiji-icon" onClick={()=>{this.changeTab("ouiji")}}/>
                    <h5>Ouija</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={altarIcon} alt="altar-icon" onClick={()=>{this.changeTab("altar")}}/>
                    <h5>Stickers</h5>
                </Col>
                <Col xs="3">
                    <img className="img-fluid" src={cardsIcon} alt="tarot-icon" onClick={()=>{this.changeTab("tarot")}}/>
                    <h5>Tarot</h5>
                </Col>
            </Row>
        </Container>

        <br />
                        
        <Container>
            <Row>
                <Col xs="12">
                    <div id="comp-container">
                        <h1 className="App-title">{this.state.tab}</h1>
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
