import React from 'react';
import { getCategories, addCategory } from '../data';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Category from './Category';

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
        <Title>Categories</Title>

        <div className="mb-4">
          <input
            ref={node => {
              this.categoryNameNode = node;
            }}
            className="p-2 border mr-1"
            type="text"
            placeholder="Category Name"
          />
          <Button variant="primary" onClick={this.addCategory}>
            Add New Category
          </Button>
        </div>

        {categories.map(c =>
          <Category
            key={c.id}
            category={c}
            onChange={() => {
              this.refreshCategories();
            }}
          />
        )}
      </div>
    );
  }
}
