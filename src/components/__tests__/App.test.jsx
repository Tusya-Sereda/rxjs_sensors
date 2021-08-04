import { render, screen } from "@testing-library/react";
import App from "../App";

test("Initial loader", () => {
  render(<App />);
  const loaderElement = screen.getByText(/Waiting for data.../i);
  expect(loaderElement).toBeInTheDocument();
});
