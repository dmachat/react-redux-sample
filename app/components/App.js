import { Link } from 'react-router';

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
