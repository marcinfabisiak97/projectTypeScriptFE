import * as React from "react";
import Table from "./Table";
import Form from "./Form";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { InterSubmit } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useGetData } from "../hooks";

const FilterTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = useState<InterSubmit[]>([]);
  const [data, setData] = useState<string | number>(0);
  const filterVal = useSelector<RootState, string>(
    (state) => state.data.filterVal
  );
  const modal = useSelector<RootState, boolean>((state) => state.modal.isOpen);
  const postData = useGetData(filterVal, rowsPerPage, page);
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

  useEffect(() => {
    setPost(postData);
  }, [postData]);
  if (!post) return null;

  return (
    <main className="mainPage">
      <Form />
      {modal && <Modal data={data} post={post} />}
      <Table
        post={post}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSendDataToModal={handleSendDataToModal}
      />
    </main>
  );
};
export default FilterTable;
