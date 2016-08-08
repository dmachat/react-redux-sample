import { Route, IndexRoute } from 'react-router/es6';
import App from '../components/App';
import data from './data';
import systemImportError from '../utils/systemImportError';

function resolveIndexComponent(nextState, cb) {
  System.import('../components/pages/HomePage')
    .then(module => cb(null, module.default))
    .catch(systemImportError);
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute getComponent={resolveIndexComponent} />
    {data}
  </Route>
);

export default routes;
