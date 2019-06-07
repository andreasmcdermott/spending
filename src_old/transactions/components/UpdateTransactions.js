import React from 'react';
import { getCategories } from '../../categories/data';
import { getAccount } from '../../accounts/data';
import { getPeriods, getTransactions, updateTransactions } from '../data';
import { withData } from '../../utils/data';
import TransactionsTable from './TransactionsTable';

class UpdateTransactions extends React.Component {
  state = {
    period: null,
    category: null
  };

  get rows() {
    if (!this.state.period) return [];

    return getTransactions(this.props.accountId, {
      period: parseInt(this.state.period, 10),
      category: this.state.category
    });
  }

  save = manualCategories => {
    const rows = this.rows;
    rows.forEach(r => {
      r.category = manualCategories[r.id] || r.category;
    });
    updateTransactions(this.props.accountId, rows);
    this.setState({});
  };

  render() {
    return (
      <div>
        <h2>
          Update rows for {this.props.account.name}
        </h2>

        <select
          value={this.state.period || ''}
          onChange={e => {
            this.setState({
              period: e.target.value
            });
          }}
        >
          <option value="">Select month</option>
          {this.props.periods.map(p => ({ value: p, label: String(p + 1) })).map(p =>
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          )}
        </select>

        <select
          value={this.state.category || ''}
          onChange={e => {
            this.setState({
              category: e.target.value
            });
          }}
        >
          <option value="">Select category</option>
          {this.props.categories.map(c =>
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          )}
        </select>

        <TransactionsTable
          rows={this.rows}
          onRefresh={() => {
            this.setState({});
          }}
          onSave={this.save}
        />
      </div>
    );
  }
}

export default withData(
  ({ accountId }) => ({
    periods: getPeriods(accountId),
    account: getAccount(accountId),
    categories: getCategories()
  }),
  ['accountId']
)(UpdateTransactions);
