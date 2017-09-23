import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

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

        return <BrowserRouter>
            <div>
                <h2>Room Database</h2>   {/* HTML element */}
                <Rooms rooms={rooms} />
                <Route path='/room' component={sample} />
            </div>
        </BrowserRouter>
    }
}

class Rooms extends React.Component {
    constructor(props) {
        super(props);
        console.log('Created a Rooms');
    }

    componentDidMount() {
        console.log(`componentDidMount ${arguments}`)
        console.dir(arguments);
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
                    <th style={styleHeader}>Room Name</th>
                    {/* <th style={styleHeader}>Location</th>
                    <th style={styleHeader}>Book?</th> */}
                </tr>

                {
                    this.props.rooms.map(function (room) {
                        return <Room key={room.id} room={room} />
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
            borderBottom: '1px solid #ddd',
            textDecoration: 'none'
        }
        // /}
        return <tr id={this.props.room.id} onMouseOver={this.onMouseOver.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} onClick={this.onClick.bind(this)}>
                <Link to={`/room/${this.props.room.id}`} style={styleRow} >
                <td>{this.props.room.name}</td>
                <td>{this.props.room.location}</td>
                <td></td>
                </Link>
            </tr>
        
    }
}


class sample extends React.Component{
    //https://reacttraining.com/react-router/
    render(){
        return <p>
                    LOADED this
            </p>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

