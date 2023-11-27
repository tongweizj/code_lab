import { render, fireEvent, screen } from "@testing-library/react";
import Static from "./Static";

test("Renders a link that points to google", () => {
  // render the App component
  render(<Static />); // save the heading in a variable
  const linkElement = screen.getByText("google");
  expect(linkElement).toBeInTheDocument();
});
