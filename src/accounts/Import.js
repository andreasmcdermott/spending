import React from 'react';
import { importRows } from '../utils/csv';
import { withData } from '../utils/data';
import { getAccountById, importSpending } from './data';
import { mapToImportFormat } from './utils';
import ImportTable from './ImportTable';
import uuid from 'uuid/v4';

class Import extends React.Component {
  state = {
    rows: null,
    errors: null
  };

  save = manualCategories => {
    const rows = this.getMappedRows();
    rows.forEach(r => {
      r.category = manualCategories[r.id] || r.category;
    });
    importSpending(this.props.account.id, rows);
    this.props.navigate('..');
  };

  getMappedRows = () => {
    const mapRow = mapToImportFormat(this.props.account.importFormat);
    const mappedRows = !!this.state.rows && this.state.rows.map(mapRow);
    return mappedRows;
  };

  render() {
    const { account } = this.props;
    const { errors } = this.state;
    const mappedRows = this.getMappedRows();

    return (
      <div>
        <h2>
          Import to {account.name}
        </h2>
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
            <ImportTable
              rows={mappedRows}
              onRefresh={() => {
                this.setState({});
              }}
              onSave={this.save}
            />
          </React.Fragment>}
        <input
          type="file"
          onChange={e => {
            importRows(e.target.files[0]).then(result => {
              this.setState({
                rows: result.data.map(r => {
                  r.uuid = uuid();
                  return r;
                }),
                errors: result.errors
              });
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
