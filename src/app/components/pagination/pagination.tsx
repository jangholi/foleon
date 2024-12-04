"use client";
import styled from "styled-components";

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PaginationItem = styled.li`
  margin: 0 5px;

  &.active {
    a {
      background-color: var(--color-primary);
      color: white;
      font-weight: bold;
    }
  }
`;

const PaginationLink = styled.a`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-light-gray);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &[aria-disabled="true"] {
    pointer-events: none;
    color: #ccc;
    border-color: #ccc;
  }
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (id: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer aria-label="Page navigation">
      <PaginationList>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            &laquo;
          </PaginationLink>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem
            key={page}
            className={page === currentPage ? "active" : ""}
          >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-disabled={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            &raquo;
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </PaginationContainer>
  );
};

export default Pagination;
