import React from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useDispatch } from "react-redux";
import { InterSubmit } from "../interfaces";
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
const Table = (props: {
  post: InterSubmit[];
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSendDataToModal: (id: number | string) => void;
}) => {
  const {
    post,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSendDataToModal,
  } = props;

  const dispatch = useDispatch();
  return (
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
  );
};

export default Table;
