import Search from "./search";
import { render, screen, fireEvent } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

describe("Search", () => {
  let onSubmitMock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
  });
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

  it("should render a input with search type", () => {
    render(<Search onSubmit={onSubmitMock} />);

    const input = screen.getByRole("searchbox");

    expect(input).toHaveProperty("type", "search");
  });

  it("should submit the form with the input value", async () => {
    render(<Search onSubmit={onSubmitMock} />);

    const inputValue = "Some text here";

    const searchForm = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, inputValue);

    await fireEvent.submit(searchForm);

    expect(onSubmitMock).toBeCalledWith(inputValue);
  });
});
