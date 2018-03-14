import React, { Component } from 'react';
import Pointer from './Pointer.js';
import './Ouija.css';
import mySocket from "socket.io-client";
import OuijaBoard from "./../../imgs/ouijiboard-nonum-02.svg";
import { Container, Row, Col } from 'reactstrap';

class Answer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            msg:'',
            questions:[],
            msgArr:null,
            alphabetUI:[],
            alphabet: [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
            ],
            letterIndex:[],
            position:[],
            pointerMove:false,
            questionMsg:'waiting for a question...',
            questionStr:''
            }
        this.pointerDone = this.pointerDone.bind(this);
    }
    componentDidMount(){
      //this.socket = mySocket("https://chat-sckt.herokuapp.com/");
      this.socket = mySocket("http://localhost:10002");    
    //generates the alphabet
        var x = 5;
      var y = 26;
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
                  top:y+"vh"
              }
          }
          temp.push(letter);
          //stores the letter coordinates
          this.setState({
              alphabetUI:temp
          });
      });
    this.socket.on("questions", (data)=>{
            this.setState({
                questions:data
            });
        console.log(data);
        this.handleQuestion(data);
        });
    }
    handleQuestion = (data)=>{
        this.setState({
            questionMsg:'You have a new question!',
            questionStr:data[data.length - 1]
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
    makeArr = () =>{
        var str = this.state.msg;
        var arr = str.split("");
            this.setState({
            msgArr:arr
            });
        this.socket.emit("response", arr);
        var temp = [];
            for (var k = 0; k<arr.length; k++){
            for(var j = 0; j<this.state.alphabet.length; j++){
              if(arr[k].toLowerCase() == this.state.alphabet[j]){
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
                pointerMove:false
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
    
    return (
        <div className="Ouija">
        <Container>
            <Row>
                <Col xs="12">
                {this.state.questionMsg}<br/>
                {this.state.questionStr}
                </Col>
            </Row>
        <Row>
            <Col xs="12">
        <input type="text" placeholder="respond" onChange={this.handleMsg}/>
        <button onClick={this.makeArr}>answer</button>
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

export default Answer;
