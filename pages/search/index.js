import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Nav from '../../components/Nav';
import './Search.scss';
import Head from 'next/head';
import Event from './Event/Event';
import { Button, Loader } from '../../components/common';
import { getEvents, resetSearch } from '../../redux/events/actions';
import { connect } from 'react-redux';

const OFFSET = 5;

const Search = ({ events, getEvents, resetSearch }) => {
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getPosts();
  }, [search, offset]);

  async function getPosts() {
    setLoading(true);

    try {
      await getEvents({
        search,
        offset,
      });
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
            resetSearch();
            setOffset(0);
          }}
          placeholder="Поиск..."
          value={search}
        />

        <br />

        <div className="search-text">
          {isLoading ? (
            <span>Загрузка...</span>
          ) : !!events.search.count ? (
            <span>Найдено мероприятий: {events.search.count}</span>
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
        {events.search.ids.map(id => {
          // if (i > 1) {
          //   return null;
          // }
          return (
            <Event
              key={id}
              id={id}
              getPosts={() => {
                // getPosts();
              }}
            />
          );
        })}
      </div>

      {events.search.count - (offset + OFFSET) >= 0 && isLoading ? (
        <Loader />
      ) : (
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

function mapStateToProps({ events }) {
  return { events };
}

Search.getInitialProps = async ({ store, req }) => {
  if (req) {
    try {
      await store.dispatch(getEvents({ host: req.headers.host }));
    } catch (error) {
      console.log(error);
    }
  }
  return { events: store.getState().events };
};

export default connect(
  mapStateToProps,
  { getEvents, resetSearch }
)(Search);
