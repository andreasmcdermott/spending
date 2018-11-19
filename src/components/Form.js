import React from 'react';

class Form extends React.Component {
  state = { formData: { ...this.props.formData } };

  onChange = (name, value) => {
    this.setState(prevState => ({ formData: { ...prevState.formData, [name]: value } }));
  };

  onSave = e => {
    e.preventDefault();
    this.props.onSave({ ...this.state.formData });
  };

  render() {
    return (
      <form onSubmit={this.onSave}>
        {this.props.children(this.state.formData, this.onChange)}
      </form>
    );
  }
}

export default Form;
