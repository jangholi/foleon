import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./search";

describe("Search", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Search component with default state", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search for publications");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).not.toBeDisabled();
  });

  test("updates the input value as the user types", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search for publications");
    fireEvent.change(inputElement, { target: { value: "Mag" } });
    expect(inputElement).toHaveValue("Mag");
  });

  test("calls onSearch with the correct value when Enter is pressed", () => {
    render(<Search onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText("Search for publications");
    fireEvent.change(inputElement, { target: { value: "Unit Test" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Unit Test");
  });

  test("disables the input when the disabled prop is true", () => {
    render(<Search onSearch={mockOnSearch} disabled={true} />);
    const inputElement = screen.getByPlaceholderText("Search for publications");
    expect(inputElement).toBeDisabled();
  });

  test("does not call onSearch when Enter is pressed on disabled input", () => {
    render(<Search onSearch={mockOnSearch} disabled={true} />);
    const inputElement = screen.getByPlaceholderText("Search for publications");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
