import React, { Component } from 'react';
import Pointer from './Pointer.js';
import './Ouija.css';
import mySocket from "socket.io-client";
import Ask from './Ask.js';
import Answer from './Answer.js';

class Ouija extends Component {
    constructor(props){
        super(props);
        
        this.state = {
                tab:0
            }
    }
    componentDidMount(){
     
    }


  render() {
      var comp = null;
      if(this.state.tab === 0){
          comp = (
            <div className="App">
                <div>Do you seek answers?</div>
                <div>
                <button onClick={()=>{this.setState({ tab: 1})}}>Yes</button><br/>
                <button onClick={()=>{this.setState({ tab: 2})}}>Bitch I'm a ghost</button>
        </div>
      </div>
          )
      } else if (this.state.tab === 1){
          comp = (
            <Ask />
          )
      } else if (this.state.tab === 2){
              comp = (
                <Answer />
              )
          }
    
    return (
      <div className="App">
        {comp}
                  </div>
    );
  }
}

export default Ouija;
