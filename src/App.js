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

    this.state = {

    }
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='main'>
        <>Chess</>
        <Board/>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
