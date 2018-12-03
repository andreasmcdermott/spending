import React from 'react';
import { removeCategory, removeFilter, updateCategory, addFilter } from '../data';
import CategoryTypes from '../../enums/category-types';
import { getRandomColor } from '../../enums/colors';
import ConfirmButton from '../../components/ConfirmButton';
import Button from '../../components/Button';
import CategoryFilterForm from './CategoryFilterForm';

const compareTypeToStr = { '=': 'equals', '<': 'less than', '>': 'greater than' };

export default class Category extends React.Component {
  state = { addingFilter: false };

  render() {
    const { addingFilter } = this.state;
    const { category, onChange } = this.props;
    const { id, name, type, color, filters } = category;

    return (
      <div className="border mb-2 p-2">
        <div className="flex">
          <h3 className="text-sm">
            {name}
          </h3>

          <span className="ml-auto">
            <ConfirmButton
              onClick={() => {
                removeCategory(id);
                onChange(id);
              }}
            >
              X
            </ConfirmButton>
          </span>
        </div>

        <div className="flex mt-1">
          <div className="w-1/3 flex-none">
            <div className="text-xs">
              {Object.entries(CategoryTypes).map(([name, value]) =>
                <label key={value} className="mr-3">
                  <input
                    type="radio"
                    className="mr-1"
                    value={value}
                    checked={type === value}
                    onChange={() => {
                      updateCategory({ ...category, type: value });
                      onChange(id);
                    }}
                  />
                  {name}
                </label>
              )}
            </div>

            <div className="flex mt-2">
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: color,
                  width: '28px',
                  height: '28px'
                }}
              />
              <input
                type="text"
                className="border p-1 text-xs"
                value={color}
                onChange={e => {
                  updateCategory({ ...category, color: e.target.value });
                  onChange(id);
                }}
              />
              <Button
                small
                onClick={() => {
                  updateCategory({ ...category, color: getRandomColor() });
                  onChange(id);
                }}
              >
                Random
              </Button>
            </div>
          </div>

          {!!filters &&
            <div className="w-auto flex-auto">
              <ul className="list-reset">
                {filters.map((f, i) =>
                  <li key={i} className="p-1 border mb-1">
                    <span>
                      {f.description}
                    </span>
                    {!!f.amount &&
                      <React.Fragment>
                        <span className="text-xs"> and </span>{' '}
                        <span className="text-xs">{compareTypeToStr[f.amount.type]}</span>{' '}
                        <span>${f.amount.value}</span>
                      </React.Fragment>}
                    <span className="float-right">
                      <ConfirmButton
                        small
                        onClick={() => {
                          removeFilter(id, i);
                          onChange(id);
                        }}
                      >
                        x
                      </ConfirmButton>
                    </span>
                  </li>
                )}
              </ul>
              {addingFilter
                ? <CategoryFilterForm
                    onSave={filter => {
                      addFilter(id, filter);
                      this.setState({ addingFilter: false });
                      onChange(id);
                    }}
                    onCancel={() => {
                      this.setState({ addingFilter: false });
                    }}
                  />
                : <Button
                    small
                    onClick={() => {
                      this.setState({ addingFilter: true });
                    }}
                  >
                    New Filter
                  </Button>}
            </div>}
        </div>
      </div>
    );
  }
}
