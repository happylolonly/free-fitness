import React, { useState } from 'react';
import Head from 'next/head';

import Nav from '../../components/Nav';

import { Textarea, Button } from '../../components/common';

import { sendFeedback } from '../../client-api';
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
      setError('Пожалуйста, напиши что-нибудь');
      return;
    }
    try {
      await sendFeedback(text);
      changeText('');
      alert('Cпасибо!');
    } catch (error) {
      setError(JSON.stringify(error));
      console.log(error);
    }
  };

  return (
    <div className="feedback">
      <Head>
        <title>Обратная связь</title>
      </Head>

      <Nav />
      <h3>Обратная связь</h3>
      <p>
        Нам важно что ты думаешь, расскажи нам!
        <br />
        Отправь свое сообщение тут или напиши нам в группах в соц сетях
      </p>
      <form onSubmit={onSubmit}>
        <Textarea onChange={onChange} error={error} value={text} />
        <Button>Отправить</Button>
      </form>
    </div>
  );
};

export default Feedback;
