import { Route } from 'react-router/es6';
import systemImportError from '../../utils/systemImportError';

if (process.env.NODE_ENV === 'development' && module.hot) {
  require('../../components/pages/DataPage');
}

function resolveDataComponent(nextState, cb) {
  System.import('../../components/pages/DataPage')
    .then(module => cb(null, module.default))
    .catch(systemImportError);
}

const routes = (
  <Route path='/data' getComponent={resolveDataComponent} />
);

export default routes;
