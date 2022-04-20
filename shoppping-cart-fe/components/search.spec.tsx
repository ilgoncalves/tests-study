import Search from "./search";
import { render, screen, fireEvent } from "@testing-library/react";

const onSubmitMock = jest.fn();

describe("Search", () => {
  it("should render Search component", () => {
    render(<Search onSubmit={onSubmitMock} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should call onSubmit button", () => {
    render(<Search onSubmit={onSubmitMock} />);

    const searchForm = screen.getByRole("form");

    fireEvent.submit(searchForm);

    expect(onSubmitMock).toBeCalledTimes(1);
  });
});
