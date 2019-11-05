import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Nav from '../../components/Nav';
import Slider from '../../components/Slider/Slider';
import './Search.scss';
import moment from 'moment';
import Head from 'next/head';
import Event from './Event/Event';

const Search = props => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    getPosts();
  }, [search]);

  async function getPosts() {
    setLoading(true);
    try {
      const responce = await axios.get('/api/events', {
        params: {
          search,
        },
      });
      setPosts(responce.data.items);
      setCount(responce.data.count);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="search-page">
      <Head>
        <title>Бесплатные фитнес мероприятия</title>
      </Head>
      <Nav />

      <h3>Мероприятия</h3>

      <div className="header">
        <input
          type="text"
          onChange={event => {
            setSearch(event.target.value);
          }}
          placeholder="Поиск..."
          value={search}
        />

        <br />
        {isLoading ? (
          <span>Загрузка...</span>
        ) : !!count ? (
          <span>Найдено мероприятий: {count}</span>
        ) : (
          <span>Ничего не найдено</span>
        )}
      </div>
      <div className="events">
        {posts.map((post, i) => {
          const { id, text, date, from_id, owner_id, comments, attachments } =
            post.text || post.attachments ? post : post.copy_history[0];
          const image =
            attachments &&
            attachments
              .find(att => att.type === 'photo')
              ?.photo.sizes.find(size => size.type === 'x')?.url;

          const link = `https://vk.com/free_fitness_minsk?w=wall${from_id}_${id}`;
          const commentsCount = (comments && comments.count) || 0;
          const serverId = `${owner_id}_${id}`;

          return (
            <Event
              key={i}
              serverId={serverId}
              link={link}
              image={image}
              getPosts={getPosts}
              commentsCount={commentsCount}
              text={text}
              date={date}
              eventDate={(post.serverData && post.serverData.date) || []}
            />
          );
        })}
      </div>
    </div>
  );
};

Search.propTypes = {};

export default Search;
