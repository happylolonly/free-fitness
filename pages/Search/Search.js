import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Search = props => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const responce = await axios.get("/api/posts");
      setPosts(responce.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {posts.map(post => {
        const { id, text, date } = post;

        return (
          <div key={id}>
            <span> Дата: {date}</span>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
};

Search.propTypes = {};

export default Search;
