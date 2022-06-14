import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
const TableDisplay = () => {
  const [post, setPost] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (currentPage) => setCurrentPage(currentPage);
  const paginate1 = (currentPage) => {
    if (currentPage === post.length) {
      setCurrentPage(post.length);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginate2 = (currentPage) => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
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
    <main className="mainPage">
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
        </tr>
        {currentPosts
          .filter((el) => el.id === Number(filter) || filter === "")
          .map((el) => (
            <tr style={{ backgroundColor: el.color }}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.year}</td>
            </tr>
          ))}
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={post.length}
        paginate={paginate}
        paginate1={paginate1}
        paginate2={paginate2}
        currentPage={currentPage}
      />
    </main>
  );
};

export default TableDisplay;
