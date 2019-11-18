import * as eventsAPI from '../../client-api/events';
import { GET_EVENTS, RESET_SEARCH, HIDE_EVENT } from './types';

export const getEvents = params => async dispatch => {
  const responce = await eventsAPI.getEvents(params);
  dispatch({
    type: GET_EVENTS,
    payload: responce.data,
  });
};

export const hideEvent = id => async dispatch => {
  const responce = await eventsAPI.hidePost(id);

  dispatch({
    type: HIDE_EVENT,
    payload: id,
  });
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};
