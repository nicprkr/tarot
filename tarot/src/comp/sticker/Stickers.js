import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";
//import Rooms from './comp/Rooms';

class Stickers extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            myImg: require("./pic1.png"),
            myImg2: require("./pic2.png"),
            allUsers:[],
            myId:null,
            showDisplay: false,
            stickers:[]
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://sticker-sckt.herokuapp.com/");
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allUsers:data
            })
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId: data
            });
            
            this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
            //FAIL
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX + "px";
            this.refs["u"+this.state.myId].style.top = ev.pageY + "px";

            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id: this.state.myId,
                src:this.refs["u"+this.state.myId].src
            })

        });
            
            this.refs.theDisplay.addEventListener("click",(ev)=>{
                this.socket.emit("stick", {
                    x: ev.pageX,
                    y: ev.pageY,
                    src:this.refs["u"+this.state.myId].src
                });
            });
        });
        
        this.socket.on("newsticker", (data)=>{
            this.setState({
                stickers:data
            });
        });
        
        this.socket.on("newmove", (data)=>{
            this.refs["u"+data.id].style.left = data.x +"px";
            this.refs["u"+data.id].style.top = data.y +"px";
            this.refs["u"+data.id].src = data.src;
        });
        
        /*
        this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
            //FAIL
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX + "px";
            this.refs["u"+this.state.myId].style.top = ev.pageY + "px";

            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id: this.state.myId,
                src:this.refs["u"+this.state.myId].src
            })

        });
        */
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        
        this.socket.emit("joinroom", roomString);
    }
    
  render() {
      
      var allImgs = this.state.allUsers.map((obj, i)=>{
          return (
          <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={100} key={i} />
          )
      });
      
      var allstickers = this.state.stickers.map((obj, i)=>{
          var mstyle = {left:obj.x, top:obj.y};
          return (
              <img style={mstyle} key={i} src={obj.src} height={50}
              className="allImgs" />
          )
      })
      
    var comp = null;
      
      if (this.state.showDisplay === false){
          comp = <Rooms handleDisplay={this.handleDisplay} />
      } else {
          (
                comp = 
                    <div>
                <div ref="theDisplay" id="display">
                {allImgs}
                {allstickers}
                    <img ref="myImg" id="myImg" src={this.state.myImg} height={100} />
                </div>

                <div id="controls">

                {this.state.myId}
                <img src={this.state.myImg} height={50} onClick={this.handleImage} />
                <img src={this.state.myImg2} height={50} onClick={this.handleImage} />
                </div>
                </div>
              )
      }
      
      
    return (
      <div className="Stickers">
        {comp}
      </div>
    );
  }
}

export default Stickers;
