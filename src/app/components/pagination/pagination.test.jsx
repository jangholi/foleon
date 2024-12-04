import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the correct number of pages", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );
    const pageLinks = screen.getAllByRole("link");
    expect(pageLinks).toHaveLength(7); // 5 + 2
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("calls onPageChange with the correct page when a page number is clicked", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );
    const page3Link = screen.getByText("3");
    fireEvent.click(page3Link);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("disables previous navigation arrow on the first page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );
    const previousArrow = screen.getByText("«");
    expect(previousArrow).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(previousArrow);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("disables next navigation arrow on the last page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />,
    );
    const nextArrow = screen.getByText("»");
    expect(nextArrow).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(nextArrow);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("navigates to the previous page when the previous arrow is clicked", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    );
    const previousArrow = screen.getByText("«");
    fireEvent.click(previousArrow);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("navigates to the next page when the next arrow is clicked", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    );
    const nextArrow = screen.getByText("»");
    fireEvent.click(nextArrow);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test("applies active class to the current page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />,
    );
    const activePage = screen.getByText("3").closest("li");
    expect(activePage).toHaveClass("active");
  });
});
