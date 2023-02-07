import { useState, useEffect } from "react";
import axios from "axios";
import { InterSubmit } from "../interfaces";
export const useGetData = (
  filterVal: string,
  rowsPerPage: number,
  page: number
) => {
  const [post, setPost] = useState<InterSubmit[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (filterVal === "") {
          const response = await axios.get(
            `https://reqres.in/api/products?per_page=${rowsPerPage}&page=${
              page + 1
            }`
          );
          setPost(response.data.data);
        } else {
          const data: InterSubmit[] = [];
          const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
          for (const id of ids) {
            if (Number(filterVal) === id) {
              const response = await axios.get(
                `https://reqres.in/api/products?id=${id}`
              );
              data.push(response.data.data);
            }
          }
          setPost(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            alert(
              "Sorry, there was an error with your request. Please try again."
            );
          } else if (
            error.response &&
            error.response.status >= 500 &&
            error.response.status < 600
          ) {
            alert(
              "Sorry, there was an internal server error. Please try again later."
            );
          }
        }
      }
    };
    getData();
  }, [filterVal, rowsPerPage, page]);

  return post;
};
