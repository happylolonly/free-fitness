import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Nav from "../../components/Nav";
import Slider from "../../components/Slider/Slider";
import "./Search.scss";
import moment from "moment";

const Search = props => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getPosts();
  }, [search]);

  async function getPosts() {
    try {
      const responce = await axios.get("/api/posts", {
        params: {
          search
        }
      });
      setPosts(responce.data.items);
      setCount(responce.data.count);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="search-page">
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
        {count && <span>Найдено мероприятий {count}</span>}
      </div>
      <div className="events">
        {posts.map(post => {
          const { id, text, date, from_id, comments, attachments } =
            post.text || post.attachments ? post : post.copy_history[0];
          const image =
            attachments &&
            attachments
              .find(att => att.type === "photo")
              ?.photo.sizes.find(size => size.type === "x")?.url;

          const link = `https://vk.com/free_fitness_minsk?w=wall${from_id}_${id}`;
          const commentsCount = (comments && comments.count) || 0;

          if ([5138, 5139].includes(id)) {
            return;
          }

          return (
            <div key={link} className="event">
              <header>
                <span>
                  Дата создания:{" "}
                  {moment(date * 1000).format("MM:HH DD.MM.YYYY")}
                </span>
                <a href={link} target="_blank">
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

              <button
                onClick={() => {
                  window.open(link);
                }}
              >
                Комментировать {commentsCount !== 0 && `(${commentsCount})`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Search.propTypes = {};

export default Search;
