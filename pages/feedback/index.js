import React from 'react';
import Head from 'next/head';

import Nav from '../../components/Nav';

import { Textarea, Button } from '../../components/common';

import './Feedback.scss';

const Feedback = () => {
  return (
    <div className="feedback">
      <Nav />
      <h3>Форма обратной связи</h3>
      <form>
        <Textarea />
        <Button>Отправить</Button>
      </form>
    </div>
  );
};

export default Feedback;
