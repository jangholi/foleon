import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PublicationCard from "./card";

describe("PublicationCard", () => {
  const mockProps = {
    publication: {
      name: "Test Publication",
      // category: 'other',
      created_on: "2024-12-01",
      _embedded: {
        screenshot: {
          _links: {
            desktop: {
              href: "https://example.com/image.jpg",
            },
          },
        },
      },
    },
  };

  test("renders the PublicationCard with correct content", () => {
    render(<PublicationCard {...mockProps} />);
    const imageElement = screen.getByAltText(
      `Cover image for ${mockProps.publication.name}`
    );

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      mockProps.publication._embedded.screenshot._links.desktop.href
    );

    const titleElement = screen.getByText(mockProps.publication.name);
    expect(titleElement).toBeInTheDocument();

    const publishTimeElement = screen.getByText(
      `Created at: ${mockProps.publication.created_on}`
    );
    expect(publishTimeElement).toBeInTheDocument();
  });

  test("applies appropriate accessibility roles and attributes", () => {
    render(<PublicationCard {...mockProps} />);

    const cardElement = screen.getByRole("article");
    expect(cardElement).toBeInTheDocument();

    expect(cardElement).toHaveAttribute(
      "aria-label",
      `card-title-${mockProps.publication.name}`
    );
  });
});
