import axios from 'axios';

export function hidePost(id) {
  axios.post('/api/events/hide', {
    id,
  });
}
