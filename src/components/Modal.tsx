import React from "react";
import { RootState } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { close } from "../state/slices/modalSlice";
import { ModalProps } from "../types";

const Modal: React.FC<ModalProps> = ({ data, post }) => {
  const state = useSelector<RootState, boolean>((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    }
    document.body.style.overflow = "unset";
  }, [state]);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalContainer__CloseBtn">
          <button onClick={() => dispatch(close())}>X</button>
        </div>
        {post
          .filter((element) => element.id === data)
          .map((element, index) => (
            <table key={index}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>year</th>
                  <th>color</th>
                  <th>pantone_value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.year}</td>
                  <td>{element.color}</td>
                  <td>{element.pantone_value}</td>
                </tr>
              </tbody>
            </table>
          ))}
        <div className="modalContainer__ConfirmBtn">
          <button
            onClick={() => {
              dispatch(close());
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
