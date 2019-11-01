import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Event.scss';
import { hidePost } from '../../../api/index';

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
        <a href={link} target="_blank">
          Источник
        </a>

        {isAdmin && <button onClick={hideEvent}>X</button>}
      </header>
      <p>{text}</p>
      {/* {image.length > 0 ? (
                <Slider images={image} />
              ) : (
                image && <img src={image} />
              )} */}
      {image && <img src={image} />}

      <button
        onClick={() => {
          window.open(link);
        }}
      >
        Комментировать {commentsCount !== 0 && `(${commentsCount})`}
      </button>
    </div>
  );
};

Event.propTypes = {};

export default Event;
