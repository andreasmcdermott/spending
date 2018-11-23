import React from 'react';
import { importRows } from '../utils/csv';
import { withData } from '../utils/data';
import { getAccountById, importSpending } from './data';
import { mapToImportFormat } from './utils';
import FilterForm from '../categories/FilterForm';
import { getCategories } from '../categories/data';

class Import extends React.Component {
  state = {
    rows: null,
    errors: null,
    filter: 'all',
    categories: getCategories(),
    manualCategories: {}
  };

  save = () => {
    importSpending(this.props.account.id, this.getMappedRows());
    this.props.navigate('..');
  };

  getMappedRows = () => {
    const mapRow = mapToImportFormat(this.props.account.importFormat, this.state.manualCategories);
    const mappedRows = !!this.state.rows && this.state.rows.map(mapRow);
    return mappedRows;
  };

  render() {
    const { account } = this.props;
    const { errors, manualCategories, categories } = this.state;
    const mappedRows = this.getMappedRows();

    return (
      <div>
        <h2>
          Import to {account.name}
        </h2>
        <FilterForm
          onSave={() => {
            this.setState({ categories: getCategories() });
          }}
        />
        {!!errors &&
          !!errors.length &&
          <React.Fragment>
            <h3>Errors</h3>
            <ul>
              {errors.map(err =>
                <li key={err}>
                  {err}
                </li>
              )}
            </ul>
          </React.Fragment>}
        {!!mappedRows &&
          <React.Fragment>
            <label>
              <input
                type="radio"
                name="filter"
                value="all"
                checked={this.state.filter === 'all'}
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
                checked={this.state.filter === 'matched'}
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
                checked={this.state.filter === '!matched'}
                onChange={() => {
                  this.setState({ filter: '!matched' });
                }}
              />Not Matched
            </label>
            <ul>
              <li>
                Mapped rows: {mappedRows.reduce((sum, r) => (!!r.category ? sum + 1 : sum), 0)}
              </li>
              <li>
                Unmapped rows: {mappedRows.reduce((sum, r) => (!r.category ? sum + 1 : sum), 0)}
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
                {mappedRows
                  .filter(row => {
                    if (this.state.filter === 'all') return true;
                    if (this.state.filter === 'matched') return !!row.category;
                    if (this.state.filter === '!matched') return !row.category;
                  })
                  .map(row =>
                    <tr
                      key={row.id}
                      style={
                        this.state.filter === 'all' && !row.category
                          ? { background: 'red' }
                          : undefined
                      }
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
                          value={row.category || ''}
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
            <button onClick={this.save}>Save</button>
          </React.Fragment>}
        <input
          type="file"
          onChange={e => {
            importRows(e.target.files[0]).then(result => {
              this.setState({ rows: result.data, errors: result.errors });
            });
          }}
        />
      </div>
    );
  }
}

export default withData(({ accountId }) => ({
  account: getAccountById(accountId)
}))(Import);
