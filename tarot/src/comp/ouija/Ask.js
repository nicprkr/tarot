import React, { Component } from 'react';
import Pointer from './Pointer.js';
import './Ouija.css';
import mySocket from "socket.io-client";

class Ask extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            msg:'',
            msgArr:null,
            alphabetUI:[],
            alphabet: [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
            ],
            letterIndex:[],
            position:[],
            pointerMove:false,
            spiritMsg:'ask the spirits...',
            answer:[]
            }
        this.pointerDone = this.pointerDone.bind(this);
    }
    componentDidMount(){
      //this.socket = mySocket("https://chat-sckt.herokuapp.com/");
      this.socket = mySocket("http://localhost:10002");    
    //generates the alphabet
      var x = 20;
      var y = 140;
      var temp = [];
      this.state.alphabet.map((obj, i)=>{
          x+= 40;
          if(obj == "n"){
              x = 40;
              y+=60;
          }
          var letter = {
              character:obj,
              index:i,
              position: {
                  left:x+"px",
                  top:y+"px"
              }
          }
          temp.push(letter);
          //stores the letter coordinates
          this.setState({
              alphabetUI:temp
          });
      });
     this.socket.on("answers", (data)=>{
        console.log(data);
         this.setState({
             spiritMsg:'The spirits have answered...'
         });
        this.handleAnswer(data);
    });
    }
    //handles user input    
    handleMsg = (evt)=>{
            this.setState({
                msg:''
            });
        this.setState({
            msg:evt.target.value
        });
    }
    //saves the input as an array of characters
    //to do - spell out characters individually
    makeArr = () =>{
        this.socket.emit("letters", this.state.msg);
    }
    handleAnswer = (data)=>{
        var arr = data[data.length - 1];
        this.setState({
            answer:arr
        })
        var temp = [];
            for (var k = 0; k<arr.length; k++){
            for(var j = 0; j<this.state.alphabet.length; j++){
              if(arr[k] == this.state.alphabet[j]){
                //  console.log(this.state.msgArr[k]);
                  temp.push(j);
              }
           }
        }
    console.log("letters ", temp);
    var temp2 = this.state.position;
        if(temp2.length > 1){
            temp2.length = 0;
        }
    for(var q = 0; q < temp.length; q++){
        var index = temp[q];
        console.log("getInfo "+ this.state.alphabetUI[index].character); 
        temp2.push(this.state.alphabetUI[index]);
           // pointerPos.push(alphaElement[this.state.letterIndex[q]].props.style);  
          }
    console.log("pointer move ", temp2);
    this.setState({
        position:temp2,
        pointerMove:true
    });
    }

    //checks if the pointer is done and re-renders the component
    pointerDone(data){
        if(data === true){
            this.setState({
                pointerMove:false,
                showMsg:true
            });
        }
    }

  render() {
      var alphaElement = this.state.alphabetUI.map((obj, i)=>{
            return (
            <div key={obj.index} style={{left:obj.position.left, top:obj.position.top}}>{obj.character}</div>
            )
          });   
      var pointer = null;
      if(this.state.pointerMove === true){
          pointer = (
            <Pointer 
                pointerPosition={this.state.position}
                pointerDone={this.pointerDone}
            />
          )
      } else if(this.state.pointerMove===false) {
          pointer= (
            <div className="pointer"></div>
          )
      }
      var spiritMsg = null;
      if(this.state.showMsg === true){
          spiritMsg = (
              <div> {this.state.answer} </div>
          )
      }
    
    return (
      <div className="App">
        {this.state.spiritMsg}
        {spiritMsg}
        {pointer}
        <div className="alphabet">
        {alphaElement}
        </div>
        <div className="controls">
        <input type="text" placeholder="enter your message here" onChange={this.handleMsg}/>
        <button onClick={this.makeArr}>ask</button>
        </div>
      </div>
    );
  }
}

export default Ask;
