/**
 * This reducer handles changes to the "data" store in our app.
 * Depending on the action, we can change the application state.
 * To add a new action, add it to the switch statement in the dataReducer function
 *
 * @example
 * case NEW_ACTION_CONSTANT:
 *   return assign({}, state, {
 *     stateVariable: action.var,
 *   });
 *
 * To add a new reducer, add a file like this one to the reducers folder and
 * add it in rootReducer.js.
 */

import * as types from '../constants';
import assignToEmpty from '../utils/assign';

const initialState = {
  items: [],
  count: 0,
};

export default function dataReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case types.ADD_DATA:
      return assignToEmpty(state, {
        count: state.count + 1,
        items: state.items.concat(
          assignToEmpty(
            action.data,
            { key: state.count + 1 }
          )
        ),
      });
    case types.REMOVE_DATA:
      return assignToEmpty(state, {
        items: state.items.filter((item) => {
          return item.key !== action.data;
        }),
      });
    default:
      return state;
  }
}
