/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  data: dataReducer,
  routing: routerReducer,
});
