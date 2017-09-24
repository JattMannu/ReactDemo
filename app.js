import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import data from './dataTest.js'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const RoomA = {
            name: 'ROOM A',
            location: 'Level 4 next to printer',
            id: 'ra',
        };
        const RoomB = {
            name: 'ROOM B',
            location: 'Level 5 next to  main pantry',
            id: 'rb'
        };
        const RoomC = {
            name: 'ROOM C',
            location: 'Level 4 opposite main hall',
            id: 'rc'
        };

        const RoomD = {
            name: 'ROOM D',
            location: 'Level 5 next to a pillar',
            id: 'rd'
        };

        const rooms = [RoomA, RoomB, RoomC, RoomD];
        console.dir(data);
        return <BrowserRouter>
            <div>
                <Rooms rooms={rooms} />
                <Route path='/room' component={BookingPage} />
            </div>
        </BrowserRouter>
    }
}
var globalThis;
class Rooms extends React.Component {
    constructor(props) {
        super(props);
        console.log('Created a Rooms');

        this.state = {
            rooms: []
        }

        globalThis = this;
    }

    componentDidMount() {
        let header = new Headers({
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080/',
            'Content-Type': 'text/json'
        });
        const p_callROOMS = new Promise(function (resolve, reject) {
            var data = null;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    // console.log(this.responseText);
                    resolve(this.response);
                }
            });

            xhr.open("GET", "http://10.208.11.129:9000/api/rhb/");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        }).then(function (data) {
            let _rooms = JSON.parse(data).data;
            return _rooms;
        }).then(function (data) {

            // globalThis.props.rooms = data;
            console.log(data);
            globalThis.setState({
                rooms: data
            });
        });
        // p_callROOMS
    }

    render() {
        const styleTable = {
            border: '1px solid black',
        };

        const styleHeader = {
            height: '50px',
            fontFamily: 'Courier New',
            fontSize: '30px'

        }

        return <table style={styleTable}>
            <tbody>
                <tr>
                    <th style={styleHeader}>HotDesk Scanner</th>
                    {/* <th style={styleHeader}>Location</th>
                    <th style={styleHeader}>Book?</th> */}
                </tr>

                {
                    this.state.rooms.map(function (room) {
                        return <Room key={room._id} room={room} />
                    })
                }
            </tbody>
        </table>
    }
}

class Room extends React.Component {
    constructor(props) {
        super(props);
        console.log('Created a Room');
        this.state = {
            isBooked: false,
            isMouseOver: false
        }
    }

    onMouseOver(sender) {
        // console.dir(sender);
        // console.dir(`onMouseOver sender : ${sender} ${this.state.isMouseOver}`);
        this.setState({
            isMouseOver: true
        });
    }

    onMouseLeave(sender) {
        //console.dir(sender);
        // console.dir(`onMouseLeave sender : ${sender} ${this.state.isMouseOver}`);
        this.setState({
            isMouseOver: false
        });
    }

    onClick(sender) {
        console.dir(sender);
        console.dir(`onClick sender : ${sender} ${this.state.isBooked}`);
        this.setState({
            isBooked: !this.state.isBooked
        });
    }

    render() {
        const styleRow = {
            height: '50px',
            fontFamily: 'Courier New',
            fontSize: '24px',
            verticalAlign: 'bottom',
            backgroundColor: this.state.isMouseOver ? '#f5f5f5' : '#ffffff',
            //color: blue;
            borderBottom: '1px solid #ddd',
            textDecoration: 'none'
        }
        return <tr>
            <Link to={`/room/${this.props.room._id}`} style={{ all: 'initial' }}>
                <div style={styleRow} id={this.props.room._id} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} onClick={this.onClick.bind(this)}>
                    <td>{this.props.room.roomName} : </td>
                    <td><RoomSlot key={this.props.room._id} room={this.props.room} /></td>
                    <td></td>
                </div>
            </Link>
        </tr>

    }
}

class RoomSlot extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var that = this;

        const styleRED = {
            backgroundColor: 'red',
            width : '50px',
            textAlign: 'center',
        }
        const styleGREEN = {
            backgroundColor: 'green',
            width : '50px',
            textAlign: 'center',
        }
        const styleYELLOW = {
            backgroundColor: 'yellow',
            width : '50px',
            textAlign: 'center',
        }

        const styleGRAY = {
            backgroundColor: 'gray',
            width : '50px',
            textAlign: 'center',
        }
        return <table>
            <tr>{
                this.props.room.slots.map(function (element) {
                    var d = new Date();
                    let currentHr = d.getHours();
                    // console.log(`CurrentHr : ${currentHr} !== ${element.slot} and that.props.room.available = ${that.props.room.available}`)

                    if (element.available) {
                        if (parseInt(element.slot) > currentHr) {
                            return <td style={styleGREEN}>{element.slot}</td>
                        }
                        else if (parseInt(element.slot) == currentHr) {
                            if(that.props.room.available){
                                return <td style={styleGREEN}>{element.slot}</td>
                            }else{
                                return <td style={styleRED}>{element.slot}</td>
                            }

                        } else if (parseInt(element.slot) < currentHr) {
                            // return <td bgcolor="red">{element.slot}</td>
                            return <td style={styleGRAY}>{element.slot}</td>
                        }
                    }
                    else if (!element.available) {
                        if (parseInt(element.slot) > currentHr) {
                            return <td style={styleRED}>{element.slot}</td>
                        }
                        else if (parseInt(element.slot) == currentHr) {
                            if(that.props.room.available){
                                return <td style={styleYELLOW}>{element.slot}</td>
                            }else{
                                return <td style={styleRED}>{element.slot}</td>
                            }


                        } else if (parseInt(element.slot) < currentHr) {
                            // return <td bgcolor="red">{element.slot}</td>
                            return <td style={styleGRAY}>{element.slot}</td>
                        }
                    }


                })
            }
            </tr>
        </table>
    }
}


class BookingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    //https://reacttraining.com/react-router/
    render() {
        console.dir(this.props);
        return <div>
            Room name : <input></input>
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

