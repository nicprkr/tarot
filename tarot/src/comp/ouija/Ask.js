import React, { Component } from 'react';
import Pointer from './Pointer.js';
import './Ouija.css';
import mySocket from "socket.io-client";
import OuijaBoard from "./../../imgs/ouijiboard-nonum-02.svg";
import { Container, Row, Col } from 'reactstrap';

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
      this.socket = mySocket("https://ouija-sckt.herokuapp.com/"); 
     // this.socket = mySocket("http://localhost:10002");    
    //generates the alphabet
      var x = 5;
      var y = 22;
      var temp = [];
      this.state.alphabet.map((obj, i)=>{
          x+= 5;
          if(obj == "n"){
              x = 10;
              y+=10;
          }
          var letter = {
              character:obj,
              index:i,
              position: {
                  left:x+"vw",
                  top:y+"vw"
              }
          }
          temp.push(letter);
          //stores the letter coordinates
          this.setState({
              alphabetUI:temp
          });
      });
     this.socket.on("answers", (data)=>{
        console.log("answer: ", data);
         this.setState({
             spiritMsg:'The spirits have answered...'
         });
        this.handleAnswer(data);
    });
}
//handles user input    
handleMsg = (evt)=>{
    this.setState({
            msg:evt.target.value
        });
    }

//saves the input as an array of characters
//to do - spell out characters individually
makeArr = () =>{
        this.socket.emit("letters", this.state.msg);
        this.setState({
            spiritMsg:'Your message has been sent!'
        })
    }
handleAnswer = (data)=>{
    //grabs most recent answer from the socket
        var arr = data[data.length - 1];
        this.setState({
            answer:arr
        })
        var temp = [];
    //checks each letter in the array against the alphabet to grab the index of the alphabet letter
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
    //clears the position if it already exists
    if(temp2.length > 1){
            temp2.length = 0;
    }
    //checks our array of letter indexes against the alphabet UI to snag the coordinates
    for(var q = 0; q < temp.length; q++){
        var index = temp[q];
//        console.log("getInfo "+ this.state.alphabetUI[index].character); 
        temp2.push(this.state.alphabetUI[index]);
     }
    //gets the pointer to move
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
      <div className="Ouija">
        <Container>
            <Row>
                <Col xs="12">
                {this.state.spiritMsg}<br/>
                {spiritMsg}
                </Col>
            </Row>
        <Row>
            <Col xs="12">
                <input type="text" placeholder="enter your message here" onChange={this.handleMsg}/>
                <button onClick={this.makeArr}>ask</button>
            </Col>
        </Row>
        <Row>
            <Col xs="12">
                {pointer}
                <img src={OuijaBoard} alt="ouijaboard"/>
                <div className="alphabet">
                    {alphaElement}
                </div>
            </Col>
        </Row>
        </Container>
     </div>
    );
  }
}

export default Ask;
