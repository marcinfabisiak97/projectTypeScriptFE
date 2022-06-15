import React from "react";
import { RootState } from "../state/reducers";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";
const Form = () => {
  const dispatch = useDispatch();
  const { show } = bindActionCreators(actionCreators, dispatch);
  const devtechshow = useSelector(
    (devtechshow: RootState) => devtechshow.devtech
  );
  return (
    <form>
      <label htmlFor="filter">filter by id:</label>
      <input
        id="filter"
        name="filter"
        type="text"
        value={devtechshow}
        onChange={(event) => {
          show(event.target.value.replace(/\D/g, ""));
        }}
      />
    </form>
  );
};

export default Form;
