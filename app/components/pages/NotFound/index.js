import { Link } from 'react-router';

export default function NotFound() {
  return (
    <article>
      <h1>Page not found.</h1>
      <Link to="/">Home</Link>
    </article>
  );
}
