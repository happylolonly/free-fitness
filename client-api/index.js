import axios from 'axios';

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

export function sendFeedback(text) {
  axios.post('/api/feedback', {
    text,
  });
}
