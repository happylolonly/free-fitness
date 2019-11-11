import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Nav from '../../components/Nav';
import './Search.scss';
import Head from 'next/head';
import Event from './Event/Event';
import Button from '../../components/common/Button/Button';

const OFFSET = 10;

const Search = props => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getPosts();
  }, [search, offset]);

  async function getPosts(replace) {
    setLoading(true);
    try {
      const responce = await axios.get('/api/events', {
        params: {
          search,
          offset,
        },
      });
      setPosts(replace ? responce.data.items : [...posts, ...responce.data.items]);
      setCount(responce.data.count);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const [isAdmin, setA] = useState(false);

  useEffect(() => {
    setA(localStorage.getItem('admin'));
  }, []);

  return (
    <div className="search-page">
      <Head>
        <title>Бесплатные фитнес мероприятия</title>
      </Head>
      <Nav />

      <h3>Бесплатные мероприятия</h3>

      <div className="header">
        <input
          type="text"
          onChange={event => {
            setSearch(event.target.value);
            setPosts([]);
            setOffset(0);
          }}
          placeholder="Поиск..."
          value={search}
        />

        <br />

        <div className="search-text">
          {isLoading ? (
            <span>Загрузка...</span>
          ) : !!count ? (
            <span>Найдено мероприятий: {count}</span>
          ) : (
            <span>Ничего не найдено</span>
          )}
        </div>
      </div>

      {isAdmin && (
        <button
          className="admin-button"
          onClick={() => {
            localStorage.removeItem('admin');
            setA(false);
            setPosts([]);
            getPosts();
          }}
        >
          снять права админа
        </button>
      )}
      <div className="events">
        {posts.map((post, i) => {
          // if (i > 1) {
          //   return null;
          // }

          const { id, text, date, from_id, owner_id, comments, attachments } = post;
          const { location } = post.serverData || {};
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
              location={location}
            />
          );
        })}
      </div>

      {count - (offset + OFFSET) >= 0 && (
        <Button
          className="load-more"
          onClick={() => {
            setOffset(offset + OFFSET);
          }}
        >
          Загрузить еще
        </Button>
      )}
    </div>
  );
};

Search.propTypes = {};

export default Search;
