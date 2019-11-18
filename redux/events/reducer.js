import * as types from './types';
import { merge, cloneDeep } from 'lodash';

const initialState = {
  //   isLoading: false,
  data: {},
  search: {
    ids: [],
    count: null,
  },
  //   count: null,
  //   error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EVENTS:
      const { items, count } = action.payload;

      const formattedEvents = items.reduce((prev, value) => {
        const { id } = value.serverData;
        prev[id] = value;
        return prev;
      }, {});

      //   merge(state, {
      //     data: formattedEvents,
      //     search: { ids: Object.keys(formattedEvents), count },
      return {
        data: { ...state.data, ...formattedEvents },
        search: {
          ids: [...state.search.ids, ...Object.keys(formattedEvents)].filter(
            (item, index, arr) => arr.indexOf(item) === index
          ),
          count,
        },
      };

    case types.RESET_SEARCH:
      return { ...state, search: initialState.search };

    // case types.LOAD_EVENT_SUCCESS:
    //   return {
    //     ...state,
    //     data: { ...state.data, [action.payload._id]: action.payload },
    //     isLoading: false,
    //   };

    case types.HIDE_EVENT:
      const id = action.payload;

      const index = state.search.ids.indexOf(id);
      state.search.ids.splice(index, 1);

      return { ...state, search: cloneDeep(state.search) };

    default:
      return state;
  }
};
