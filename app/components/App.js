import { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default function App(props) {
  return (
    <div>
      <ul className="nav">
        <Link to="/">Home</Link>
        <Link to="/data">Data</Link>
      </ul>
      {props.children}
    </div>
  );
}

// Redux connection

// Which props to inject from the global atomic state
/*
export default connect((state) => {
  return {
    data: state,
  };
})(App);
*/
