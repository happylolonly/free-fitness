import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../../components/Nav';
import { Input, Textarea, Button } from '../../components/common';

import './New.scss';
import { useState } from 'react';
import { createEvent } from '../../client-api/index';

const New = props => {
  const initialForm = {
    title: {},
    text: {},
    location: {},
  };
  const [form, setForm] = useState(initialForm);

  function validate() {
    const { title, text, location } = form;

    if (!title.value || !text.value || !location.value) {
      return false;
    }
    return true;
  }

  async function create() {
    if (!validate()) {
      alert('заполни все поля');
      return;
    }

    try {
      await createEvent(
        Object.keys(form).reduce((acc, val) => {
          acc[val] = form[val].value;
          return acc;
        }, {})
      );
      setForm({ title: {}, text: {}, location: {} });
      alert('Спасибо');
    } catch (error) {
      console.dir(error);
      alert('ошибка');
    }
  }

  function onChange(value, name) {
    setForm({
      ...form,
      [name]: {
        value,
      },
    });
  }
  return (
    <div className="new-page">
      <Nav />
      <h3>Добавить мероприятия</h3>
      <p>
        У нас пока нету функционала для добавления мероприятия на сайт, но ты можешь его добавить{' '}
        <a href="https://vk.com/free_fitness_minsk" target="_blank">
          через нашу группу в Вк
        </a>
        <br />
        Твое мероприятие сразу же появится на сайте;)
      </p>

      {/* <br />
      <br />
      <br />
      <br />
      <br />

      <p>Ты пока можешь создавать мероприятия с этими полями</p>
      <div className="new-event">
        <Input
          label="Заголовок"
          value={form.title.value}
          name="title"
          onChange={onChange}
          error={form.title.error}
        />

        <Textarea
          label="Описание"
          value={form.text.value}
          name="text"
          onChange={onChange}
          error={form.text.error}
        />

        <Textarea 
        title="Ссылка на картинку"
        value={form.text.value}
        name="image"
        onChange={onChange}
        error={form.text.error}
        />

        <Input
          label="Место проведения"
          value={form.location.value}
          name="location"
          onChange={onChange}
          error={form.location.error}
        />

        <Button onClick={create}>Сохранить</Button>
      </div> */}
    </div>
  );
};

New.propTypes = {};

export default New;
