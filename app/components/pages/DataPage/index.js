/**
 * HomePage
 * This is the initial landing page for our app.
 */

import { Component } from 'react';
import { connect } from 'react-redux';

import triggerAction from '../../../actions';
import * as types from '../../../constants';

const defaultInput = {
  label: '',
  value: '',
};

class DataPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.state = defaultInput;
  }

  dataList() {
    return this.props.data.items.map((item) => {
      const boundClick = this.handleRemove.bind(this, item.key);
      return (
        <li key={item.key}>
          {item.label} - {item.value}
          <a href onClick={boundClick}>
            remove
          </a>
        </li>
      );
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.dispatch(triggerAction(types.ADD_DATA, {
      label: this.state.label,
      value: +this.state.value,
    }));
    this.setState(defaultInput);
  }

  handleLabelChange(evt) {
    this.setState({ label: evt.target.value });
  }

  handleValueChange(evt) {
    this.setState({ value: evt.target.value });
  }

  handleRemove(id, evt) {
    evt.preventDefault();
    this.props.dispatch(triggerAction(types.REMOVE_DATA, +id));
  }

  render() {
    return (
      <div>
        <h3>Data</h3>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.label}
            onChange={this.handleLabelChange}
            placeholder="Data label">
          </input>
          <input
            type="number"
            value={this.state.value}
            onChange={this.handleValueChange}
            placeholder="Data">
          </input>
          <input
            type="submit"
            value="Add Data Item">
          </input>
        </form>

        <h5>Data List:</h5>
        <ul>
          {this.dataList()}
        </ul>
      </div>
    );
  }
}

// Redux connection

// Which props to inject from the global atomic state
export default connect((state) => {
  return {
    data: state.data,
  };
})(DataPage);
