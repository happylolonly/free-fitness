import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Event.scss';
import { hidePost, addDate } from '../../../client-api/index';
import Button from '../../../components/common/Button/Button';
import { strictEqual } from 'assert';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import Input from '../../../components/common/Input/Input';

const Event = ({
  link,
  image,
  commentsCount,
  text = '',
  date,
  serverId,
  location: location2,
  getPosts,
  eventDate = [],
}) => {
  // if (!Array.isArray(eventDate)) {
  //   debugger;
  // }

  const [eventDates, setEventDates] = useState(eventDate);
  async function hideEvent() {
    try {
      await hidePost(serverId);

      getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  const [isAdmin, setA] = useState(false);
  const [location, setLocation] = useState(location2);

  useEffect(() => {
    setA(localStorage.getItem('admin'));
  }, []);

  console.log(eventDates);

  function renderDateFields() {
    const DateTimePicker = require('react-datetime-picker').default; // TODO: async load
    return (
      <div>
        <h3>Админка</h3>

        <h5>Добавить дату к посту</h5>

        {eventDates.map((date, i) => {
          return (
            <div key={date} className="date-item">
              <DateTimePicker
                onChange={date => {
                  eventDates[i] = date;
                  setEventDates([...eventDates]);
                }}
                value={new Date(date)}
              />
              <button
                onClick={() => {
                  eventDates.splice(i, 1);
                  setEventDates([...eventDates]);
                }}
              >
                Удалить
              </button>
            </div>
          );
        })}

        <button
          onClick={() => {
            setEventDates([...eventDates, new Date()]);
          }}
        >
          Добавить поле
        </button>

        <hr />

        <h5>Добавить местоположение</h5>
        <Input value={location} onChange={value => setLocation(value)} />

        <hr />
        <button
          onClick={async () => {
            await addDate(serverId, {
              date: eventDates,
              location,
            });
            await getPosts();
            alert('сохранено');
          }}
        >
          Сохранить
        </button>
      </div>
    );
  }

  const replaceText = () => {
    let str = text;
    // while (str.indexOf('+') !== -1) {
    //   let start = str.indexOf('+');
    //   let end = str.indexOf('', start + 13);
    //   const findNumber = str.substring(start, end);
    //   const createNumber = findNumber.link('tel:' + findNumber);
    //   const numberInLink = str.replace(findNumber, createNumber);
    //   return numberInLink;
    // }

    // return str;

    str = str.replace('www.', 'https://');

    function urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      });
      // or alternatively
      // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }

    str = urlify(str);

    str = str.replace(/\n/g, '<br />');
    return str;
  };

  return (
    <div className="event">
      <header>
        <div className="time">
          {/* <span>Дата создания: {moment(date * 1000).format('HH:mm DD.MMM.YYYY')}</span> */}

          {eventDates.map(date => {
            return <span key={date}>Дата проведения: {moment(date).format('D MMMM YYYY')}</span>;
          })}

          {location && <span>Местоположение: {location}</span>}
        </div>
        {/* <a href={link} target="_blank" className="source">
          Источник
        </a> */}
      </header>
      <p dangerouslySetInnerHTML={{ __html: replaceText(text) }}></p>
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
