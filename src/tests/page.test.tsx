import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Testing DashboardPage Components", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  it("renders a loader", () => {
    render(<Page />);

    const loader = screen.getByRole("loader");
    expect(loader).toBeInTheDocument();
  });
  //TODO: Complete the tests
});
