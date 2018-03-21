import React, { Component } from 'react';
import './sticker-style.css';
import mySocket from "socket.io-client";
import Rooms from "./Rooms";
import { Container, Row, Col } from 'reactstrap';

class Stickers extends Component {
    constructor(props){
        super(props);
        this.state = {
            allusers:[],
            myId:null,
            showDisplay:false,
            stickers:[],
            baseStickers: {
                    candle: {src: require("../../imgs/candle.png"), height: "100px"},
                    singingbowl: {src: require("../../imgs/singingbowl.png"), height: "50px"},
                    pentagram: {src: require("../../imgs/pentagram.png"), height: "50px"},
                    quartz: {src: require("../../imgs/quartz.png"), height: "50px"},
                    chalice: {src: require("../../imgs/chalice.png"), height: "50px"},
                    dragoncup: {src: require("../../imgs/dragoncup.png"), height: "75px"},
                    saltlamp: {src: require("../../imgs/saltlamp.png"), height: "50px"},
                    tapestry: {src: require("../../imgs/tapestry.png"), height: "50px"}
                }
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("http://localhost:10005");
        //this.socket = mySocket("https://sticker-sckt.herokuapp.com/");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allusers:data
            }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
            
            this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            //console.log(ev.pageX, ev.pageY);
                if(this.state.myId === null){
                    //FAIL
                    return false;
                }

                this.refs["u"+this.state.myId].style.left = (ev.pageX-90)+"px";
                this.refs["u"+this.state.myId].style.top = (ev.pageY-330)+"px";

                this.socket.emit("mymove", {
                    x:(ev.pageX-90),
                    y:(ev.pageY-330),
                    id:this.state.myId,
                    src:this.refs["u"+this.state.myId].src,
                    height:this.refs["u"+this.state.myId].height
                })
            });
            
            this.refs.thedisplay.addEventListener("click", (ev)=>{
                this.socket.emit("stick", {
                    x:(ev.pageX-90),
                    y:(ev.pageY-330),
                    src:this.refs["u"+this.state.myId].src,
                    height:this.refs["u"+this.state.myId].height
                });
            });

        });

        this.socket.on("newsticker", (data)=>{
            console.log(data);
            this.setState({
                stickers:data
            });
        });
        
//        this.socket.on("newmove", (data)=>{
//            //console.log(data);
//            this.refs["u"+data.id].style.left = data.x+"px";
//            this.refs["u"+data.id].style.top = data.y+"px";
//            this.refs["u"+data.id].src = data.src;
//            
//        });
        
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
        this.refs["u"+this.state.myId].height = evt.target.height;
        console.log("evt clicked", evt.target);
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        
        this.socket.emit("joinroom", roomString);
    }
    
    render() {
        
        var allimgs = this.state.allusers.map((obj, i)=>{
            return (
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={obj.height} key={i} />
            )    
        });
        
        var allstickers = this.state.stickers.map((obj, i)=>{
            var mstyle = {left:obj.x, top:obj.y};
            return (
                <img style={mstyle} key={i} src={obj.src} height={obj.height} className="allImgs" />
            )
        })
        
        var comp = null;
        
        if(this.state.showDisplay === false){
            //Rooms
            comp = <Rooms 
                handleDisplay={this.handleDisplay}
            />;
            
        } else {
            //Display
            comp = (
                <div>
                
                    <div ref="thedisplay" id="display">
                        {allimgs}
                        {allstickers}
                        <div id="altarTable">
                            <img style={{paddingTop:"100px"}} height="400px" src={require("../../imgs/table.png")}/> 
                        </div>
                    </div>
                
                    <div id="controls">
                        <div id="stickerChoice" style={{flexDirection:"column"}}>
                            {Object.values(this.state.baseStickers).map((obj, i)=>{
                                return (
                                    <img onClick={this.handleImage} key={i} src={obj.src} height={obj.height}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <Container>
            
                <Row>
                    <Col xs="12">
                        {comp}
                        
                    </Col>
                </Row>
                                                                                  
            </Container>
        );
    }
}

export default Stickers;