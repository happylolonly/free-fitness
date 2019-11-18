import axios from 'axios';

export function getEvents(params) {
  console.log(`${params.host || ''}/api/events`);
  return axios.get(`${params.host ? 'http://' + params.host : ''}/api/events`, {
    params,
  });
}

export function hidePost(id) {
  axios.post('/api/events/hide', {
    id,
  });
}
