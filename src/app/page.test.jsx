import "@testing-library/jest-dom";
import { render, act, screen } from "@testing-library/react";
import Home from "./page";
import { fetchProjects } from "./api/projects";
import { fetchPublications } from "./api/publication";

jest.mock("./api/index");
jest.mock("./api/projects");
jest.mock("./api/publication");

describe("Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders basic elements", async () => {
    fetchProjects.mockResolvedValueOnce({ projects: [] });
    fetchPublications.mockResolvedValueOnce({
      publications: [],
      pagination: { page_count: 1, page: 1 },
    });

    await act(async () => {
      render(<Home />);
    });

    expect(
      screen.getByLabelText("Search for publications"),
    ).toBeInTheDocument();
  });

  it("renders projects in the select dropdown", async () => {
    fetchProjects.mockResolvedValueOnce({
      projects: [
        { id: 1, name: "Project A" },
        { id: 2, name: "Project B" },
      ],
    });
    fetchPublications.mockResolvedValueOnce({
      publications: [],
      pagination: { page_count: 1, page: 1 },
    });

    await act(async () => {
      render(<Home />);
    });

    const projectDropdown = screen.getByRole("combobox", {
      name: "Select a project",
    });
    expect(projectDropdown).toBeInTheDocument();
    expect(projectDropdown).toHaveTextContent("All projects");
    expect(projectDropdown).toHaveTextContent("Project A");
    expect(projectDropdown).toHaveTextContent("Project B");
  });

  it('displays "No results!" when no publications are found', async () => {
    fetchProjects.mockResolvedValueOnce({ projects: [] });
    fetchPublications.mockResolvedValueOnce({
      publications: [],
      pagination: { page_count: 1, page: 1 },
    });

    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText(/no results!/i)).toBeInTheDocument();
  });
});
