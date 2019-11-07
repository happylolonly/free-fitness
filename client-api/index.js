import axios from 'axios';

export function hidePost(id) {
  axios.post('/api/events/hide', {
    id,
  });
}

export function addDate(id, data) {
  axios.post('/api/events/date', {
    id,
    data,
  });
}

export function createEvent(data) {
  axios.post('/api/events/create', {
    ...data,
  });
}
