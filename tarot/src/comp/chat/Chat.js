import React, { Component } from 'react';
import './App.css';
import mySocket from 'socket.io-client';

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
        console.log("clicked!");
        var msg = this.state.uName+": "+this.state.mymsg;
        this.socket.emit("sendmsg", msg);
    }
    
  render() {
      var comp = null;
      
      if(this.state.mode===0){
      comp = (
        <div>
            <input type="text" placeholder="type in your username" onChange={this.handleChange}/>
          <button onClick={this.joinChat}>Join Chat</button>
          </div>
      )
      } else if (this.state.mode === 1){
          comp = (
          <div id="chatBox">
              <div id="chatDisplay"></div>
              <div id="Controls">
              <input type="text" placeholder="type your msg here" onChange={this.handleMyMsg} />
              <button onClick={this.sendMsg}>Send</button>
              </div>
              </div>
          );
      }
      var allNames = this.state.allUsers.map((obj, i)=>{
          return ( 
              <div key={i}>
              {obj}
              </div>
              )
      });
      var allMsgs = this.state.allmsg.map((obj, i)=>{
          return ( 
              <div key={i}>
              {obj}
          </div>
              )
      });
    return (
      <div className="App">
        <div className="userBox">All Users
        <div>{allNames}</div>
        </div>
        {comp}
        {allMsgs}
      </div>
    );
  }
}

export default Chat;
