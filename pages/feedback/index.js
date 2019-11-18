import React, { useState } from 'react';
import Head from 'next/head';

import Nav from '../../components/Nav';

import { Textarea, Button } from '../../components/common';

import './Feedback.scss';

const Feedback = () => {
  const [error, setError] = useState('');
  const [text, changeText] = useState('');

  const onChange = value => {
    changeText(value);
    setError('');
  };

  const onSubmit = async event => {
    event.preventDefault();

    if (!text.length) {
      setError('Please write something');
      return;
    }
    try {
      await postUserFeedback(text);
      close();
    } catch (error) {
      setError(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <div className="feedback">
      <Nav />
      <h3>Форма обратной связи</h3>
      <form onSubmit={onSubmit}>
        <Textarea onChange={onChange} error={error} />
        <Button>Отправить</Button>
      </form>
    </div>
  );
};

export default Feedback;
