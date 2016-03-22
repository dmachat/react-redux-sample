/**
 * HomePage
 * This is the initial landing page for our app.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import assignToEmpty from '../../../utils/assign';

class HomePage extends Component {
  computeData() {
    const summary = this.props.data.items.reduce((acc, curr) => {
      return assignToEmpty(acc, {
        info: acc.info.concat(curr.label),
        total: acc.total + curr.value,
      });
    },
    {
      info: [],
      total: 0,
    });
    return !!this.props.data.items.length ?
      (<h5>Summary: {summary.info.join(',')} - {summary.total}</h5>) :
      (<h5>No data has been added</h5>);
  }

  render() {
    const dispatch = this.props.dispatch;
    return (
      <div>
        <h3>Home</h3>
        <p>A small sample app to demonstrate Redux with React Router. Use the Data page to change the state of the app.</p>
        {this.computeData()}
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
})(HomePage);
