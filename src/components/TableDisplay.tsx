import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
const TableDisplay = () => {
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("https://reqres.in/api/products")
      .then((response) => {
        setPost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!post) return null;
  return (
    <Fragment>
      <input
        id="filter"
        name="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      {post
        .filter((el) => el.id == filter || filter === "")
        .map((el) => (
          <div style={{ backgroundColor: el.color }}>
            <h1>{el.id}</h1>
            <p>{el.name}</p>
            <p>{el.year}</p>
            <p>{el.color}</p>
            <p>{el.pantone_value}</p>
          </div>
        ))}
    </Fragment>
  );
};

export default TableDisplay;
