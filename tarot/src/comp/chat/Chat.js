import React, { Component } from 'react';
import './App.css';
import mySocket from 'socket.io-client';
import { Container, Row, Col } from 'reactstrap';

class Chat extends Component {
    constructor(props){
    super(props);
        this.state= {
            uName:'anonymous',
            allUsers:[],
            mode:0,
            allNames:[],
            allmsg:[],
            mymsg:""
        }
this.handleChange = this.handleChange.bind(this);
this.joinChat = this.joinChat.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
    }
    componentDidMount(){
  //      this.socket = mySocket("http://localhost:10001");
    }
    handleChange(e){
        this.setState({
            uName:e.target.value
        });
    }
    handleMyMsg(evt){
        this.setState({
            mymsg:evt.target.value
        })
    }
    joinChat(){
        this.setState({
        mode:1
        })
    
        this.socket = mySocket("https://chat-sckt.herokuapp.com/");
        //this.socket = mySocket("localhost:10000");
        this.socket.emit("uname", this.state.uName);
        this.socket.on("names", (data)=>{
            this.setState({
                allUsers:data
            })
        });
        
        this.socket.on("msgs", (data)=>{
            this.setState({
                allmsg:data
            })
        });
    }
    sendMsg(){
        var msg = this.state.uName+": "+this.state.mymsg;
        this.socket.emit("sendmsg", msg);
    }
    
  render() {
      var chatControl = null;
      
      if(this.state.mode===0){
      chatControl = (
        <div className="chat-controls">
            <input className="text-input" type="text" placeholder="choose a username" onChange={this.handleChange}/>
            <button onClick={this.joinChat}>Join Chat</button>
          </div>
      )
      } else if (this.state.mode === 1){
          chatControl = (
                <div className="chat-controls">
                  <input className="text-input" type="text" placeholder="send your message to the coven" onChange={this.handleMyMsg} />
                  <button onClick={this.sendMsg}>Send</button>
                </div>
          );
      }
      var allNames = this.state.allUsers.map((obj, i)=>{
          return ( 
              <div className="all-names-obj" key={i}>
              {obj}
              </div>
              )
      });
      var allMsgs = this.state.allmsg.map((obj, i)=>{
          return ( 
            <div className="all-msg-obj" key={i}>
              {obj}
            </div>
              )
      });
    return (
      <div className="Chat">
        <Container>
            <Row id="chat-container">
                <Col xs="3" id="user-box">
                    <h5>in your coven</h5>
                    {allNames}
                </Col>
                <Col xs="9">
                    <Row>
                        <Col xs="12">
                            <div id="msg-box" className="scrollbar">
                                {allMsgs}
                            </div>
                        </Col>
                        <Col xs="12">
                            {chatControl}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Chat;
