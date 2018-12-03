import React from 'react';

export default class ConfirmButton extends React.Component {
  state = { clicked: false };

  render() {
    const { children, onClick, small } = this.props;
    const { clicked } = this.state;
    const size = small ? 'w-3 h-3 text-xs' : 'w-6 h-6';

    return clicked
      ? <span className="flex">
          <button className={`bg-green hover:bg-green-dark rounded-full ${size}`} onClick={onClick}>
            ✓
          </button>
          <button
            className={`bg-red hover:bg-red-dark rounded-full ${size}`}
            onClick={() => {
              this.setState({ clicked: false });
            }}
          >
            ✗
          </button>
        </span>
      : <button
          className={`text-white bg-grey-darker hover:bg-grey-darkest rounded-full ${size}`}
          onClick={() => {
            this.setState({ clicked: true });
          }}
        >
          {children}
        </button>;
  }
}
