import * as React from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
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
const Table = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = useState<InterSubmit[]>([]);
  const [data, setData] = useState<string | number>(0);
  const filterVal = useSelector<RootState, string>(
    (state) => state.data.filterVal
  );
  const modal = useSelector<RootState, boolean>((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - post.length) : 0;
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

  const getData = async (data: string | number) => {
    try {
      const response = await axios.get("https://reqres.in/api/products", {
        params: {
          filter: data,
        },
      });
      setPost(response.data.data);
      console.log(response);
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
    getData(data);
  }, [data]);
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
          {(rowsPerPage > 0
            ? post.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : post
          )
            .filter((el) => el.id === Number(filterVal) || filterVal === "")
            .map((row) => (
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
          {emptyRows > 0 && (
            <tr style={{ height: 35.5 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[1, 5, { label: "All", value: -1 }]}
              colSpan={3}
              count={post.length}
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
export default Table;
