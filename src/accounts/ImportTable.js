import React from 'react';
import FilterForm from '../categories/FilterForm';
import { getCategories } from '../categories/data';

export default class ImportTable extends React.Component {
  state = {
    filter: 'all',
    categories: getCategories(),
    manualCategories: {}
  };

  render() {
    const { rows, onSave, onRefresh } = this.props;
    const { filter, categories, manualCategories } = this.state;

    return (
      <React.Fragment>
        <FilterForm
          onSave={() => {
            this.setState({ categories: getCategories() });
            onRefresh();
          }}
        />
        <label>
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => {
              this.setState({ filter: 'all' });
            }}
          />{' '}
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="matched"
            checked={filter === 'matched'}
            onChange={() => {
              this.setState({ filter: 'matched' });
            }}
          />Matched
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            value="!matched"
            checked={filter === '!matched'}
            onChange={() => {
              this.setState({ filter: '!matched' });
            }}
          />Not Matched
        </label>
        <ul>
          <li>
            Mapped rows:{' '}
            {rows.reduce((sum, r) => (!!manualCategories[r.id] || !!r.category ? sum + 1 : sum), 0)}
          </li>
          <li>
            Unmapped rows:{' '}
            {rows.reduce((sum, r) => (!manualCategories[r.id] && !r.category ? sum + 1 : sum), 0)}
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .filter(row => {
                if (filter === 'all') return true;
                if (filter === 'matched') return !!manualCategories[row.id] || !!row.category;
                if (filter === '!matched') return !manualCategories[row.id] && !row.category;
              })
              .map(row =>
                <tr
                  key={row.id}
                  style={filter === 'all' && !row.category ? { background: 'red' } : undefined}
                >
                  <td>
                    {row.id}
                  </td>
                  <td>
                    {row.date.toString()}
                  </td>
                  <td>
                    {row.description}
                  </td>
                  <td>
                    {row.amount}
                  </td>
                  <td>
                    <select
                      value={manualCategories[row.id] || row.category || ''}
                      onChange={e => {
                        manualCategories[row.id] = e.target.value;
                        this.setState({ manualCategories });
                      }}
                    >
                      <option value="">Select category</option>
                      {categories.map(c =>
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      )}
                    </select>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {onSave &&
          <button
            onClick={() => {
              onSave(manualCategories);
            }}
          >
            Save
          </button>}
      </React.Fragment>
    );
  }
}
