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
      <form>
        <input
          id="filter"
          name="filter"
          type="text"
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setFilter(event.target.value.replace(/\D/g, ""));
          }}
        />
      </form>
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>year</th>
          <th>color</th>
          <th>pantone value</th>
        </tr>
        {post
          .filter((el) => el.id === Number(filter) || filter === "")
          .map((el) => (
            <tr style={{ backgroundColor: el.color }}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.year}</td>
              <td>{el.color}</td>
              <td>{el.pantone_value}</td>
            </tr>
          ))}
      </table>
    </Fragment>
  );
};

export default TableDisplay;
