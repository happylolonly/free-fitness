import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Event.scss';
import { hidePost, addDate } from '../../../client-api/index';
import Button from '../../../components/Button/Button';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

const Event = ({ link, image, commentsCount, text, date, serverId, getPosts, eventDate = [] }) => {
  // if (!Array.isArray(eventDate)) {
  //   debugger;
  // }

  const [eventDate2, setEventDate] = useState(eventDate[0] ? new Date(eventDate[0]) : null);
  console.error(eventDate2);
  async function hideEvent() {
    try {
      await hidePost(serverId);

      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const [isAdmin, setA] = useState(false);

  useEffect(() => {
    setA(localStorage.getItem('admin'));
  }, []);

  function renderDateFields() {
    const DateTimePicker = require('react-datetime-picker').default; // TODO: async load
    return (
      <div>
        <h5>Админка</h5>

        <h3>Добавить дату к посту</h3>
        <DateTimePicker
          onChange={date => {
            setEventDate(date);
          }}
          value={eventDate2}
        />
        <button
          onClick={async () => {
            await addDate(serverId, [eventDate2]);
            await getPosts();
            alert('сохранено');
          }}
        >
          Сохранить
        </button>
      </div>
    );
  }

  return (
    <div className="event">
      <header>
        <div className="time">
          {/* <span>Дата создания: {moment(date * 1000).format('HH:mm DD.MMM.YYYY')}</span> */}
          {eventDate2 && <span>Дата проведения: {moment(eventDate2).format('D MMMM YYYY')}</span>}
        </div>
        <a href={link} target="_blank" className="source">
          Источник
        </a>
      </header>
      <p>{text}</p>
      {/* {image.length > 0 ? (
                <Slider images={image} />
              ) : (
                image && <img src={image} />
              )} */}
      {image && <img src={image} />}

      <Button
        onClick={() => {
          window.open(link);
        }}
      >
        Подробнее
        {/* {commentsCount !== 0 && `(${commentsCount})`} */}
      </Button>

      {isAdmin && renderDateFields()}
      {isAdmin && <Button onClick={hideEvent}>скрыть пост</Button>}
    </div>
  );
};

Event.propTypes = {};

export default Event;
