import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Event.scss';
import { hidePost } from '../../../api/index';
import Button from '../../../components/Button/Button';

const Event = ({ link, image, commentsCount, text, date, serverId, getPosts }) => {
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

  return (
    <div className="event">
      <header>
        <span>Дата создания: {moment(date * 1000).format('MM:HH DD.MM.YYYY')}</span>
        <a href={link} target="_blank" className="source">
          Источник
        </a>

        {isAdmin && <Button onClick={hideEvent}>X</Button>}
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
    </div>
  );
};

Event.propTypes = {};

export default Event;
