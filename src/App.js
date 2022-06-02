import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board.js';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  };

  render() {
    return (
      <div className="main">
        <>Chess</>
        <Board/>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
