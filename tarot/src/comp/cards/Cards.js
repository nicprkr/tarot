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
            introMsg: "Want to get your fortune read? Or read for another?",
            readerMsg: "Waiting for your dealer",
            cards: [
        {
            name: "The Fool",
            number: 0,
            meaning: "Let go of expectations and trust your instincts."

        }, 
          
        {
            name: "The Magician",
            number: 1,
            meaning: "Be creative and stay open -- your possibilities are endless."
        },
            
        {
            name: "The High Priestess",
            number: 2,
            meaning: "Get your self out of the way and become attuned to a more spiritual view."
        },
            
        {
            name: "The Empress",
            number: 3,
            meaning: "Look for opportunities to be generous, warm, and nurturing."
        },
            
        {
            name: "The Emperor",
            number: 4,
            meaning: "You have the wisdom and authority to achieve your goals."
        },
            
        {
            name: "The Hierophant",
            number: 5,
            meaning: "Expand your inner knowledge and share it with others."
        },
            
        {
            name: "The Lovers",
            number: 6,
            meaning: "Integrate two potential realities or let go of one of them."
        },
            
        {
            name: "The Chariot",
            number: 7,
            meaning: "Use your powers of freedom and flexibility to drive your future."
        },
            
        {
            name: "Strength",
            number: 8,
            meaning: "Balance your primal force with intuition and compassion."
        },
            
        {
            name: "The Hermit",
            number: 9,
            meaning: "Gaze into the mysteries of your inner life."
        },
            
         {
            name: "Wheel of Fortune",
            number: 10,
            meaning: "Learn to go with the flow without resisting ups and downs."
        },
            
        {
            name: "Justice",
            number: 11,
            meaning: "Balance the scales to support truth and serve the greatest good."
        },
            
         {
            name: "The Hanged Man",
            number: 12,
            meaning: "You have reached a crossroads, making it possible to clear the slate and start over."
        },
            
        {
            name: "Death",
            number: 13,
            meaning: "Shed the old to make room for the new."
        },
            
         {
            name: "Temperance",
            number: 14,
            meaning: "The time is now for self-healing."
        },
            
         {
            name: "The Devil",
            number: 15,
            meaning: "Put subtlety aside and empower your passion and confidence."
        },
            
         {
            name: "The Tower",
            number: 16,
            meaning: "Because of circumstances beyond your control, you have no choice."
        },
            
        {
            name: "The Star",
            number: 17,
            meaning: "Rise above your day-to-day and connect with the divine."
        },
        
         {
            name: "The Moon",
            number: 18,
            meaning: "This is an opportunity to draw messages from your inner self."
        },
            
         {
            name: "The Sun",
            number: 19,
            meaning: "You are in the right place at the right time."
        },
            
         {
            name: "Judgement",
            number: 20,
            meaning: "You have the power to make changes and feel complete."
        },
            
        {
            name: "The World",
            number: 21,
            meaning: "You are in a timeless state of grace where all is well."
        }]
        }
    }
    
    componentDidMount(){
        this.socket = mySocket("https://tarot-sckt.herokuapp.com/");
        //this.socket = mySocket("http://localhost:10000");
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
        </div>
    );

      var view; 
      
      var cardDeck = this.state.cards.map((obj, i)=>{
        
          return (
            <div 
              
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
                    {this.state.introMsg}
                    <br />
                    <div className="btn-group">
                        <button className="ghost-btns" onClick={this.handleRole.bind(this, true)}>Dealer</button>
                        <button className="ghost-btns" onClick={this.handleRole.bind(this, false)}>Reader</button>
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