import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './cards-css.css';
import { Container, Row, Col } from 'reactstrap';


class Cards extends Component {
    constructor(props){
    super(props);
        
        this.addToHand = this.addToHand.bind(this);
        this.handleRole = this.handleRole.bind(this);
        
        this.state = {
            dealer: null,
            twoplayer: true,
            hand: [],
            readerMsg: "Waiting for your dealer",
            cards: [
        {
            name: "The Fool",
            number: 0,
            meaning: "yr foolish"
        }, 
          
        {
            name: "The Magician",
            number: 1,
            meaning: "yr magical"
        },
            
        {
            name: "The High Priestess",
            number: 2,
            meaning: "yr a gooddess"
        },
            
        {
            name: "The Empress",
            number: 3,
            meaning: "yr magical"
        },
            
        {
            name: "The Emperor",
            number: 4,
            meaning: "yr magical"
        },
            
        {
            name: "The Hierophant",
            number: 5,
            meaning: "yr magical"
        },
            
        {
            name: "The Lovers",
            number: 6,
            meaning: "yr magical"
        },
            
        {
            name: "The Chariot",
            number: 7,
            meaning: "yr magical"
        },
            
        {
            name: "Strength",
            number: 8,
            meaning: "yr magical"
        },
            
        {
            name: "The Hermit",
            number: 9,
            meaning: "yr magical"
        },
            
         {
            name: "Wheel of Fortune",
            number: 10,
            meaning: "yr magical"
        },
            
        {
            name: "Justice",
            number: 11,
            meaning: "yr magical"
        },
            
         {
            name: "The Hanged Man",
            number: 12,
            meaning: "yr magical"
        },
            
        {
            name: "Death",
            number: 13,
            meaning: "yr magical"
        },
            
         {
            name: "Temperance",
            number: 14,
            meaning: "yr magical"
        },
            
         {
            name: "The Devil",
            number: 15,
            meaning: "yr magical"
        },
            
         {
            name: "The Tower",
            number: 16,
            meaning: "yr magical"
        },
            
        {
            name: "The Star",
            number: 17,
            meaning: "yr magical"
        },
        
         {
            name: "The Moon",
            number: 18,
            meaning: "yr magical"
        },
            
         {
            name: "The Sun",
            number: 19,
            meaning: "yr magical"
        },
            
         {
            name: "Judgement",
            number: 20,
            meaning: "yr magical"
        },
            
        {
            name: "The World",
            number: 21,
            meaning: "yr magical"
        }]
        }
    }
    
    componentDidMount(){
        //this.socket = mySocket("https://tarot-sckt.herokuapp.com/");
        this.socket = mySocket("http://localhost:10000");
        this.socket.on("newCardMsg", (data)=>{
            this.setState({
                readerMsg: data
            });
        });
    }
    
    addToHand(obj){
        var tempArr = this.state.hand;
        tempArr.push(obj);
        
        this.setState({
            hand: tempArr
        });
        
        var indivCard = (
            <div>
                <p style={{fontWeight:"700"}}>{obj.name}</p>
                <p>{obj.number}</p>
            </div>
        );
        
        this.socket.emit("addCard", obj);
    
    }
    
    handleRole=(isDealer)=>{
        this.setState({
            dealer: isDealer
        })
    }
    

  render() {   
      
    var indivCard = (
        <div>
        <p>nothing</p>
        </div>
    );

      var view; 
      
      var cardDeck = this.state.cards.map((obj, i)=>{
        var bgColor = i%2===1 ? "#f7f3f0" : "white";
          return (
            <div 
              style={{backgroundColor: bgColor}}
              className="allCards" 
              key={i}
              onClick={()=>this.addToHand(obj)}>
                
                {indivCard}

            </div>
          );
      });

    var cardHand = this.state.hand.map((obj, i)=>{
        return(
            <div className="allCards" key={i}>
                <p>{obj.name}</p>
            </div>
        );
    });
                
      if (this.state.dealer === true){
          view = (
              <div>
                <h3>Choose three cards</h3>
                <br />
                <div className="flexCards">
                    {cardDeck}
                    {cardHand}
                </div>
              </div>
          );
      }
      if (this.state.dealer === false){
          view = (
            <div>
                <h3>{this.state.readerMsg}</h3>
            </div>
          );
      }
      
    
    return (
      <div className="Cards">
        <Container>
            <Row>
                <Col xs="12">
                    <div className="roleBtns">
                        <button onClick={this.handleRole.bind(this, true)}>Dealer</button>
                        <button onClick={this.handleRole.bind(this, false)}>Reader</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <div className="flexContainer">
                        {view}
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    );
  }
}

export default Cards;