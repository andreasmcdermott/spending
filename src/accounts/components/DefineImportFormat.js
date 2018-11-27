import React from 'react';
import { getHeaders } from '../../utils/csv';
import ColumnTypes, { guessType } from '../../enums/column-types';
import { setImportFormat } from '../data';

export default class DefineImportFormat extends React.Component {
  state = { columns: [] };

  save = () => {
    setImportFormat(this.props.accountId, { columns: this.state.columns });
    this.props.navigate('..');
  };

  ignoreUndefined = () => {
    const { columns } = this.state;
    this.setState({
      columns: columns.map(c => {
        if (c.type === ColumnTypes.NotDefined) return { ...c, type: ColumnTypes.Ignored };
        return c;
      })
    });
  };

  render() {
    const { columns } = this.state;
    return (
      <div>
        <h2>Define import format</h2>
        <table>
          <tbody>
            {columns.map(c =>
              <tr key={c.name}>
                <td>
                  {c.name}
                </td>
                <td>
                  <select
                    value={c.type}
                    onChange={e => {
                      this.setState({
                        columns: columns.map(
                          x => (c.name === x.name ? { ...x, type: e.target.value } : x)
                        )
                      });
                    }}
                  >
                    {Object.entries(ColumnTypes).map(([k, v]) =>
                      <option key={v} value={v}>
                        {k}
                      </option>
                    )}
                  </select>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <input
          type="file"
          onChange={e => {
            getHeaders(e.target.files[0]).then(columns => {
              this.setState({
                columns: columns.map(c => ({ name: c, type: guessType(c) }))
              });
            });
          }}
        />
        <ul>
          {Object.entries(ColumnTypes)
            .filter(
              ([key, value]) => value !== ColumnTypes.Ignored && value !== ColumnTypes.NotDefined
            )
            .map(([key, value]) =>
              <li key={value}>
                {`${key}: ${columns.some(c => c.type === value) ? '✅' : '⭕'}`}
              </li>
            )}
        </ul>

        <div>
          <button onClick={this.ignoreUndefined}>Ignore undefined</button>
        </div>

        <div>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }
}
