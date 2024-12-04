import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./select";

describe("Select", () => {
  const mockOnChange = jest.fn();

  const mockItems = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Select component with provided items", () => {
    render(<Select items={mockItems} onChange={mockOnChange} />);

    const selectBox = screen.getByRole("combobox");
    expect(selectBox).toBeInTheDocument();
    expect(selectBox).not.toBeDisabled();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(mockItems.length);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test("calls onChange with the correct value when an option is selected", () => {
    render(
      <Select
        items={mockItems}
        onChange={mockOnChange}
        ariaLabel="select an option"
      />,
    );

    const selectBox = screen.getByRole("combobox", {
      name: /select an option/i,
    });

    fireEvent.change(selectBox, { target: { value: "2" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("2");
  });

  test("disables the select box when the disabled prop is true", () => {
    render(
      <Select items={mockItems} onChange={mockOnChange} disabled={true} />,
    );

    const selectBox = screen.getByRole("combobox");

    expect(selectBox).toBeDisabled();
  });

  test("renders with no options if the items prop is empty", () => {
    render(<Select items={[]} onChange={mockOnChange} />);

    const options = screen.queryAllByRole("option");
    expect(options).toHaveLength(0);
  });

  test("updates the selectedItem state when an option is selected", () => {
    const { container } = render(
      <Select items={mockItems} onChange={mockOnChange} />,
    );
    const selectBox = container.querySelector("select");

    fireEvent.change(selectBox, { target: { value: "3" } });

    expect(selectBox).toHaveValue("3");
  });
});
