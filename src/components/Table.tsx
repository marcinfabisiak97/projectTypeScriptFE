import * as React from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useState, useEffect } from "react";
import axios from "axios";
import { TypeSubmit } from "../types";
import Form from "./Form";
import { RootState } from "../state/reducers";
import { useSelector } from "react-redux";
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
  const [post, setPost] = useState<TypeSubmit[]>([]);
  const filterVal = useSelector((filterVal: RootState) => filterVal.devtech);
  // Avoid a layout jump when reaching the last page with empty rows.
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
      <Form />
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
              <tr style={{ backgroundColor: row.color }} key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.year}</td>
              </tr>
            ))}
          {emptyRows > 0 && (
            <tr style={{ height: 35 * emptyRows }}>
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
