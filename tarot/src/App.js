import React, { Component } from 'react';
import broom from './imgs/broom.png';
import potion from './imgs/potion.png';
import lamp from './imgs/lamp.png';
import crystal from './imgs/crystal.png';
import './App.css';
import Stickers from './comp/stickers/Stickers.js';
import Chat from './comp/chat/Chat.js';

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
        <div className="nav">
         <div className="icons">
          <img src={broom} alt="broom-icon" onClick={()=>{this.changeTab(1)}}/><br/>
          <div>Chat</div>
        </div>
        <div className="icons">
          <img src={potion} alt="broom-icon" onClick={()=>{this.changeTab(2)}}/><br/>
          <div>Ouija</div>
        </div>
        <div className="icons">
          <img src={lamp} alt="broom-icon" onClick={()=>{this.changeTab(3)}}/><br/>
          <div>Stickers</div>
        </div>
        <div className="icons">
          <img src={crystal} alt="broom-icon" onClick={()=>{this.changeTab(4)}}/><br/>
          <div>Tarot</div>
        </div>
              </div>
          <h1 className="App-title">fortune teller</h1>

            <div>
              {comp}
              </div>
      </div>
    );
  }
}

export default App;
