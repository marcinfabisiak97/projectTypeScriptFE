import { render } from "@testing-library/react";
import Form from "./Form";
describe("Form Component", () => {
  test("rendered input", () => {
    const { getByTestId } = render(<Form />);
    const input = getByTestId("filterBar");
    expect(input).toBeFalsy();
  });
});
