import React from 'react';
import PropTypes from 'prop-types';

export default class Collapsible extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shown: false,
    }
  };

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div onClick={()=>this.setState({shown: !this.state.shown})}>{this.props.name}</div>
        {this.state.shown &&
          <>
            {this.props.options.map(option => {
              return (
                <div>{option}</div>
              )
            })
            }
          </>
        }
      </div>
    )
  }
}

Collapsible.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};