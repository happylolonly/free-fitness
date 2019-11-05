import axios from 'axios';

export function hidePost(id) {
  axios.post('/api/events/hide', {
    id,
  });
}

export function addDate(id, date) {
  axios.post('/api/events/date', {
    id,
    date,
  });
}
