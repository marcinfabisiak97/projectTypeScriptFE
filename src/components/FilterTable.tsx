import * as React from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useState, useEffect } from "react";
import axios from "axios";
import { InterSubmit } from "../interfaces";
import Form from "./Form";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { open } from "../state/slices/modalSlice";

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
const FilterTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = useState<InterSubmit[]>([]);
  const [data, setData] = useState<string | number>(0);
  const filterVal = useSelector<RootState, string>(
    (state) => state.data.filterVal
  );
  const modal = useSelector<RootState, boolean>((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSendDataToModal = (id: number | string) => {
    setData(id);
  };
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
        const data = [];
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

  useEffect(() => {
    getData();
  }, [filterVal, rowsPerPage, page]);
  if (!post) return null;

  return (
    <main className="mainPage">
      <Form />
      {modal && <Modal data={data} post={post} />}
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>year</th>
          </tr>
        </thead>
        <tbody>
          {post.map((row) => (
            <tr
              role="apiTest"
              style={{ backgroundColor: row.color }}
              key={row.id}
              onClick={() => {
                dispatch(open());
                handleSendDataToModal(row.id);
              }}
            >
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.year}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[1, 5, 12]}
              colSpan={3}
              count={12}
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </main>
  );
};
export default FilterTable;
