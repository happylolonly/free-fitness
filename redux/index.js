import { combineReducers } from 'redux';

import eventsReducer from './events/reducer';

const rootReducer = combineReducers({
  events: eventsReducer,
});

export default rootReducer;
