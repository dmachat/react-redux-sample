// Import third party libraries
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory, match } from 'react-router/es6';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from './routes';

// Create the store with redux-thunk middleware, which allows us to
// do asyncronous things in the actions
import rootReducer from './reducers/rootReducer';
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

const container = document.getElementById('app');

function routerError(error) {
  console.log('==> 😭  React Router match failed.');
  if (error) {
    console.error(error);
  }
}

// Set up routes for pages that are wrapped in the App component
function renderApp() {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      routerError(error);
    } else if (redirectLocation) {
      return;
    } else if (renderProps) {
      render(
        <Provider store={store}>
          <AppContainer>
            <Router {...renderProps} />
          </AppContainer>
        </Provider>,
        container
      );
    } else {
      routerError();
    }
  });
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./');
  module.hot.accept('./routes', renderApp);
}

renderApp();
