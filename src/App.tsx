import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [post, setPost] = useState([]);

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
      {post.map((el) => (
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
}

export default App;
