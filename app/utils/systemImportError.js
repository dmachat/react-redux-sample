import NotFound from '../components/pages/NotFound';

export default function handleError(err) {
  console.log(err);
  return NotFound;
}
