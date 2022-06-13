import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';
import './styles.scss';

export default class App extends React.Component {

  static connection;

  static {
    this.connection = new WebSocket('ws://' + "localhost" + ':' + 3000);
  }

  constructor(props) {
    super(props);
    
    this.connection;
    this.roomInput = React.createRef();

    this.state = {

    }
  };

  componentDidMount() {
    
  }

  randomRoom() {
    App.connection.send(JSON.stringify({
      type: 'randomRoom'
    }));

    App.connection.onmessage = (message) => {
      var json = JSON.parse(message.data);
      if (json.type == 'randomRoom') {
        window.location.pathname = json.room;
      }
    }
  }

  render() {
    return (
      <div className='main'>
        {window.location.pathname.split("/").at(-1) ?
          <>
            <>Chess</>
            <Board/>
          </>
          :
          <>
            <input type="text" ref={this.roomInput}/>
            <button onClick={() => window.location.pathname = this.roomInput.current.value}>Join room</button>
            <br />
            <button onClick={() => this.randomRoom()}>Join random room</button>
          </>
        }
        
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
