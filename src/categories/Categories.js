import React from 'react';
import { getCategories, addCategory, removeFilter, updateCategory } from '../categories/data';
import CategoryTypes from './categoryTypes';
import FilterForm from './FilterForm';

export default class Categories extends React.Component {
  state = { categories: getCategories() };
  categoryNameNode = null;

  addCategory = () => {
    addCategory(this.categoryNameNode.value);
    this.categoryNameNode.value = '';
    this.setState({ categories: getCategories() });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h3>Categories</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Filters</th>
              <th>Is Spending</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c =>
              <tr key={c.id}>
                <td>
                  {c.name}
                </td>
                <td>
                  {!!c.filters &&
                    <ul>
                      {c.filters.map((f, i) =>
                        <li key={i}>
                          {f.description} | {!!f.amount ? `${f.amount.type}${f.amount.value}` : '-'}
                          <button
                            onClick={() => {
                              removeFilter(c.id, i);
                              this.setState({ categories: getCategories() });
                            }}
                          >
                            Del
                          </button>
                        </li>
                      )}
                    </ul>}
                </td>
                <td>
                  <label>
                    <input
                      type="radio"
                      value={CategoryTypes.Spending}
                      checked={c.type === CategoryTypes.Spending}
                      onChange={() => {
                        c.type = CategoryTypes.Spending;
                        updateCategory(c);
                        this.setState({ categories: getCategories() });
                      }}
                    />{' '}
                    Spending
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={CategoryTypes.Income}
                      checked={c.type === CategoryTypes.Income}
                      onChange={() => {
                        c.type = CategoryTypes.Income;
                        updateCategory(c);
                        this.setState({ categories: getCategories() });
                      }}
                    />{' '}
                    Income
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={CategoryTypes.Ignored}
                      checked={c.type === CategoryTypes.Ignored}
                      onChange={() => {
                        c.type = CategoryTypes.Ignored;
                        updateCategory(c);
                        this.setState({ categories: getCategories() });
                      }}
                    />{' '}
                    Ignored
                  </label>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <input
            ref={node => {
              this.categoryNameNode = node;
            }}
            type="text"
            placeholder="name"
          />
          <button onClick={this.addCategory}>Add New Category</button>
          <hr />
          <FilterForm
            onSave={() => {
              this.setState({ categories: getCategories() });
            }}
          />
        </div>
      </div>
    );
  }
}
