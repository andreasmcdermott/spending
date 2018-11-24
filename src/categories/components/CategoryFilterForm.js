import React from 'react';
import { getCategories, addFilter } from '../data';

export default class FilterForm extends React.Component {
  state = {
    categories: getCategories(),
    category: '',
    description: '',
    amount: null,
    amountCompare: '='
  };

  render() {
    return (
      <div>
        <select
          value={this.state.category}
          onChange={e => {
            this.setState({ category: e.target.value });
          }}
        >
          <option value="">Select category</option>
          {this.state.categories.map(c =>
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          )}
        </select>
        <input
          placeholder="Description"
          value={this.state.description}
          onChange={e => {
            this.setState({ description: e.target.value.toLowerCase() });
          }}
          type="text"
        />
        <label>
          <input
            type="radio"
            name="amountCompare"
            value="="
            checked={this.state.amountCompare === '='}
            onChange={() => {
              this.setState({ amountCompare: '=' });
            }}
          />&#61;
        </label>
        <label>
          <input
            type="radio"
            name="amountCompare"
            value=">"
            checked={this.state.amountCompare === '>'}
            onChange={() => {
              this.setState({ amountCompare: '>' });
            }}
          />&gt;
        </label>
        <label>
          <input
            type="radio"
            name="amountCompare"
            value="<"
            checked={this.state.amountCompare === '<'}
            onChange={() => {
              this.setState({ amountCompare: '<' });
            }}
          />&lt;
        </label>
        <input
          placeholder="Amount"
          value={String(this.state.amount != null ? String(this.state.amount) : '')}
          onChange={e => {
            this.setState({
              amount: parseFloat(e.target.value)
            });
          }}
          type="number"
        />
        <button
          onClick={() => {
            addFilter(this.state.category, {
              description: this.state.description,
              amount:
                this.state.amount !== null
                  ? {
                      value: this.state.amount,
                      type: this.state.amountCompare
                    }
                  : null
            });
            this.setState({ categories: getCategories(), description: '', amount: null });
            this.props.onSave && this.props.onSave();
          }}
        >
          Add Category Filter
        </button>
      </div>
    );
  }
}
