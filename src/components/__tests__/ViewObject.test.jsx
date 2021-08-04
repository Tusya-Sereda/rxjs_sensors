import { render, screen } from "@testing-library/react";
import ViewObject from "../ViewObject";

test("Displayed title as sensor key", () => {
  render(<ViewObject sensorKey="SOME KEY" />);
  const titleElement = screen.getByText(/SOME KEY/i);
  expect(titleElement).toBeInTheDocument();
});

test("Initial value as no data", () => {
  render(<ViewObject sensorKey="SOME KEY" />);
  const noDataElement = screen.getByText(/No data/i);
  expect(noDataElement).toBeInTheDocument();
});
