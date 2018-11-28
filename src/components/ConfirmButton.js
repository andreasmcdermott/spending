import React from 'react';
import Button from './Button';

export default class ConfirmButton extends React.Component {
  state = { clicked: false };

  render() {
    const { children, onClick } = this.props;
    const { clicked } = this.state;
    return clicked
      ? <span className="flex">
          <button className="bg-green w-6 h-6 rounded-full" onClick={onClick}>
            ✓
          </button>
          <button
            className="bg-red w-6 h-6 rounded-full"
            onClick={() => {
              this.setState({ clicked: false });
            }}
          >
            ✗
          </button>
        </span>
      : <button
          className="bg-grey-darker hover:bg-grey-darkest w-6 h-6 text-white rounded-full"
          onClick={() => {
            this.setState({ clicked: true });
          }}
        >
          {children}
        </button>;
  }
}
