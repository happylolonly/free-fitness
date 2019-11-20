import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Event.scss';
import { addDate } from '../../../client-api/index';
import Button from '../../../components/common/Button/Button';
import { strictEqual } from 'assert';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import Input from '../../../components/common/Input/Input';
// import CalendarButton from './CalendarButton/CalendarButton';
// import { CalendarButton } from 'components/CalendarButton/CalendarButton';
import { connect } from 'react-redux';
import { getEvents, resetSearch, hideEvent } from '../../../redux/events/actions';

const Event = ({ id, events, hideEvent, getPosts }) => {
  // if (!Array.isArray(eventDate)) {
  //   debugger;
  // }

  const { text, date, owner_id, comments, attachments, serverData } = events.data[id];
  const { location: location2 } = serverData;
  const image =
    attachments &&
    attachments.find(att => att.type === 'photo')?.photo.sizes.find(size => size.type === 'x')?.url;

  const link = `https://vk.com/free_fitness_minsk?w=wall${owner_id}_${events.data[id].id}`;
  const commentsCount = (comments && comments.count) || 0;

  const [eventDates, setEventDates] = useState(serverData.date || []);
  async function hide() {
    try {
      await hideEvent(id);
    } catch (error) {
      console.log(error);
    }
  }

  const [isAdmin, setA] = useState(false);
  const [location, setLocation] = useState(location2 || '');
  const [isAddToCalendarOpen, setAddToCalendar] = useState(false);

  useEffect(() => {
    setA(localStorage.getItem('admin'));
  }, []);

  function renderDateFields() {
    const DateTimePicker = require('react-datetime-picker').default; // TODO: async load
    return (
      <div>
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
            setEventDates([...eventDates, new Date().setHours(0, 0, 0, 0)]);
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
            await addDate(id, {
              date: eventDates,
              location,
            });
            alert('Cохранено');
            // await getPosts(true);
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
    <>
      <div className="event">
        <header>
          <div className="info">
            {/* <span>Дата создания: {moment(date * 1000).format('HH:mm DD.MMM.YYYY')}</span> */}

            <span className="dates">
              {eventDates.map((date, i) => {
                return (
                  <>
                    <span key={date}>
                      {moment(date).format('HH:mm') !== '00:00'
                        ? moment(date).format('D MMMM в HH:mm')
                        : moment(date).format('D MMMM')}
                    </span>
                    {i !== eventDates.length - 1 && ', '}
                    {/* {isAddToCalendarOpen && <CalendarButton />} */}
                  </>
                );
              })}
            </span>

            {location && (
              <a
                className="location"
                target="_blank"
                href={`https://yandex.by/maps/minsk?text=${encodeURI(location)}`}
              >
                {location}
              </a>
            )}
          </div>
          <Button
            onClick={() => {
              window.open(link);
            }}
          >
            Подробнее
            {/* {commentsCount !== 0 && `(${commentsCount})`} */}
          </Button>
        </header>
        <p dangerouslySetInnerHTML={{ __html: replaceText(text) }}></p>
        {/* {image.length > 0 ? (
                <Slider images={image} />
              ) : (
                image && <img src={image} />
              )} */}
        {image && <img src={image} />}
      </div>

      {isAdmin && (
        <div className="admin-block">
          {renderDateFields()}
          <Button onClick={hide}>скрыть пост</Button>
        </div>
      )}
    </>
  );
};

Event.propTypes = {};

function mapStateToProps({ events }) {
  return { events };
}

export default connect(mapStateToProps, { getEvents, resetSearch, hideEvent })(Event);
