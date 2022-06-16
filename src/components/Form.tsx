import React from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";
const Form = () => {
  const dispatch = useDispatch();
  const { show } = bindActionCreators(actionCreators, dispatch);
  const filterVal = useSelector((filterVal: RootState) => filterVal.devtech);
  return (
    <form className="form">
      <label role="filterLabel" htmlFor="filter">
        filter by id:
      </label>
      <input
        role="filterInput"
        id="filter"
        name="filter"
        type="text"
        value={filterVal}
        onChange={(event) => {
          show(event.target.value.replace(/\D/g, ""));
        }}
      />
    </form>
  );
};

export default Form;
