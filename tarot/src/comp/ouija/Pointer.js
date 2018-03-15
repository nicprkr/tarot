import React, { Component } from 'react';
import './Ouija.css';

class Pointer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            position:[],
            animate:false,
            currentCount:0
    }
}
    componentDidMount(){
//        console.log("loaded pointer~");
        this.setState({
            intervalId: null
        });
        //start timer if the props exists
        if(this.props.pointerPosition.length > 1){
            this.startTimer();
            this.setState({
                animate:true
            })
        }
    }
//set the timer
startTimer = ()=>{
        var interval = setInterval(this.timer, 1000);
        this.setState({
            intervalId:interval
        });
}
timer = ()=>{
    var num = this.state.currentCount;
    num = num+1;
    this.setState({
        currentCount:num
    });
//    console.log(this.state.currentCount, this.props.pointerPosition.length);
    if(num === this.props.pointerPosition.length){
        this.setState({
            animate:false
        });
        this.props.pointerDone(true);
    }
}

componentWillUnmount = ()=>{
    clearInterval(this.state.intervalId);
}
        
  render() {
      var pointer = null;
  //checks the pointer position and changes it when the state count increases    
      if(this.props.pointerPosition.length > 1){
          if(this.state.animate === true && this.state.currentCount !== this.props.pointerPosition.length){
          var pos = this.props.pointerPosition[this.state.currentCount].position;
//          console.log(pos);
          pointer = (
            <div className="pointer" style={pos}></div>
          )
          }
      } else {
          pointer = (
            <div className="pointer"></div>
          )
      }
      
    return (
        <div>
      {pointer}
        </div>
    );
  }
}

export default Pointer;
