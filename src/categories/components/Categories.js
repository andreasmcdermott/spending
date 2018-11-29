import React from 'react';
import { getCategories, addCategory, removeCategory, removeFilter, updateCategory } from '../data';
import CategoryTypes from '../../enums/category-types';
import CategoryFilterForm from './CategoryFilterForm';
import { getRandomColor } from '../../enums/colors';

export default class Categories extends React.Component {
  categoryNameNode = null;

  constructor(...args) {
    super(...args);
    this.state = { categories: [] };
    this.refreshCategories();
  }

  addCategory = () => {
    addCategory(this.categoryNameNode.value);
    this.categoryNameNode.value = '';
    this.refreshCategories();
  };

  refreshCategories = () => {
    getCategories().then(categories => {
      this.setState({ categories });
    });
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
              <th>Type</th>
              <th>Color</th>
              <th />
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
                              this.refreshCategories();
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
                        this.refreshCategories();
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
                        this.refreshCategories();
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
                        this.refreshCategories();
                      }}
                    />{' '}
                    Ignored
                  </label>
                </td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: c.color,
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <input
                    type="text"
                    value={c.color}
                    onChange={e => {
                      c.color = e.target.value;
                      updateCategory(c);
                      this.refreshCategories();
                    }}
                  />
                  <button
                    onClick={() => {
                      c.color = getRandomColor();
                      updateCategory(c);
                      this.refreshCategories();
                    }}
                  >
                    Random Color
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      removeCategory(c.id);
                      this.refreshCategories();
                    }}
                  >
                    Remove
                  </button>
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
          <CategoryFilterForm onSave={this.refreshCategories} />
        </div>
      </div>
    );
  }
}
