import React from 'react';
import Button from '../../components/Button';

export default class FilterForm extends React.Component {
  state = {
    description: '',
    amount: null,
    amountCompare: '='
  };

  render() {
    return (
      <div>
        <input
          className="border p-1 mr-2 text-xs"
          placeholder="Description"
          value={this.state.description}
          onChange={e => {
            this.setState({ description: e.target.value.toLowerCase() });
          }}
          type="text"
        />
        {['=', '<', '>'].map(type =>
          <label key={type} className="mr-1 text-xs">
            <input
              className="mr-1"
              type="radio"
              name="amountCompare"
              value={type}
              checked={this.state.amountCompare === type}
              onChange={() => {
                this.setState({ amountCompare: type });
              }}
            />
            {type}
          </label>
        )}

        <input
          className="border text-xs p-1"
          placeholder="Amount"
          value={String(this.state.amount != null ? String(this.state.amount) : '')}
          onChange={e => {
            this.setState({
              amount: parseFloat(e.target.value)
            });
          }}
          type="number"
        />
        <span className="mx-1">
          <Button
            small
            variant="primary"
            onClick={() => {
              this.props.onSave({
                description: this.state.description,
                amount:
                  this.state.amount !== null
                    ? {
                        value: this.state.amount,
                        type: this.state.amountCompare
                      }
                    : null
              });
            }}
          >
            Add Filter
          </Button>
        </span>
        <Button small onClick={this.props.onCancel}>
          Cancel
        </Button>
      </div>
    );
  }
}
