import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "./Form";
import { Provider } from "react-redux";
import { store } from "../state/store";
test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
  const linkElement = screen.getByRole("label");
  expect(linkElement).toHaveTextContent("filter by id:");
});
test("Input render", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <Form />
    </Provider>
  );
  const input = getByRole("textbox");
  expect(input).toBeTruthy();
});
