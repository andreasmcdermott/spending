import React from 'react';

export default class ConfirmButton extends React.Component {
  state = { clicked: false };

  render() {
    const { children, onClick } = this.props;
    const { clicked } = this.state;
    return clicked
      ? <span className="flex">
          <span className="bg-grey-darker text-white p-2">Are you sure?</span>
          <button className="bg-green p-2" onClick={onClick}>
            ✓
          </button>
          <button
            className="bg-red p-2"
            onClick={() => {
              this.setState({ clicked: false });
            }}
          >
            ✗
          </button>
        </span>
      : <button
          className="bg-grey-darker hover:bg-grey-darkest p-2 text-white"
          onClick={() => {
            this.setState({ clicked: true });
          }}
        >
          {children}
        </button>;
  }
}
