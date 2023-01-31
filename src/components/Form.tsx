import React from "react";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { readValue } from "../state/slices/dataSlice";
const Form = () => {
  const dispatch = useDispatch();
  const filterVal = useSelector<RootState, string>(
    (state) => state.data.filterVal
  );
  return (
    <form className="form">
      <label role="label" htmlFor="filter">
        filter by id:
      </label>
      <input
        role="textbox"
        id="filter"
        name="filter"
        type="text"
        value={filterVal}
        onChange={(event) => {
          dispatch(readValue(event.target.value.replace(/\D/g, "")));
        }}
      />
    </form>
  );
};

export default Form;
