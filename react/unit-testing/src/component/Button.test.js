import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

test("Adds one", () => {
  // render the App component
  render(<Button />); // save the heading in a variable
  const heading = screen.getByTestId("currentNumber"); // save the button in a variable
  const btn = screen.getByTestId("addOne"); // click the btn
  fireEvent.click(btn); // test assumption
  expect(heading).toHaveTextContent("2");
});
