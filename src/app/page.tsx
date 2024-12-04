"use client";

import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import "../../public/styles/colors.css";
import Logo from "./components/logo/logo";
import Search from "./components/search/search";
import Select from "./components/select/select";
import Card from "./components/card/card";
import { APIProject, fetchProjects } from "./api/projects";
import { fetchPublications, APIPublication } from "./api/publication";
import { APIPagination } from "./api/types";
import Pagination from "./components/pagination/pagination";
import { createGlobalStyle } from "styled-components";
import Loading from "./components/loading/loading";

// Define global styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
  }
`;

// Styles
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexItem = styled.div`
  padding: 20px;
  border-bottom: 2px solid var(--color-divider);

  &:last-child {
    border: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 10px;
  overflow: hidden;
`;

const SearchContainer = styled.div`
  grid-column: span 12;

  @media (min-width: 480px) {
    grid-column: span 8;
  }

  @media (min-width: 768px) {
    grid-column: span 7;
  }
  @media (min-width: 1024px) {
    grid-column: span 5;
  }
`;

const SelectContainer = styled.div`
  grid-column: span 12;
  margin: 5px 0;

  @media (min-width: 320px) {
    grid-column: span 6;
  }
  @media (min-width: 480px) {
    grid-column: span 4;
  }
  @media (min-width: 768px) {
    grid-column: span 3;
  }
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`;

const HeadingContainer = styled(FlexItem)`
  border-bottom: 0;
  h1 {
    grid-column: span 12;
    margin: 20px 0;
  }
`;
const CardContainer = styled(Container)`
  width: 100%;
  display: grid;
  gap: 16px;
  padding: 20px;
  grid-template-columns: 1fr;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
  }
`;

const PaginationContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  width: 100%;
`;

export default function Home() {
  // API state
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<APIProject[]>();
  const [publications, setPublications] = useState<{
    publications: APIPublication[];
    pagination: APIPagination;
  }>();

  // Filters state
  const [page, setPage] = useState(1);
  const [project, setproject] = useState<number>();
  const [search, setSearch] = useState<string>();
  const [category, setCategory] = useState<string>();

  // Fetch projects
  useEffect(() => {
    fetchProjects()
      .then(({ projects }) => {
        setProjects(projects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  // Fetch publications
  useEffect(() => {
    setLoading(true);
    fetchPublications({
      project,
      search,
      category,
      page,
    })
      .then((publications) => {
        setPublications(publications);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [project, search, category, page]);

  // Projects select items
  const projectsList = useMemo(() => {
    return [
      { label: "All projects", value: "" },
      ...(projects || []).map((project) => ({
        label: project.name,
        value: project.id,
      })),
    ];
  }, [projects]);

  // Categories select items (available in results)
  const categoriesList = useMemo(() => {
    const allCategories = Array.from(
      new Set(
        publications?.publications.map((publication) => publication.category)
      )
    ).sort();
    return [
      { label: "All categories", value: "" },
      ...allCategories.map((category) => ({
        label: category.replace(/_/g, " "),
        value: category,
      })),
    ];
  }, [publications]);

  return (
    <FlexContainer>
      <GlobalStyle />
      <FlexItem as="header">
        <Logo />
      </FlexItem>

      <FlexItem>
        <Container>
          <SearchContainer>
            <Search
              onSearch={(search) => setSearch(search)}
              disabled={loading}
            />
          </SearchContainer>
        </Container>
      </FlexItem>

      <FlexItem>
        <Container>
          <SelectContainer>
            <Select
              ariaLabel="Select a project"
              items={projectsList}
              disabled={loading}
              onChange={(value) => {
                setproject(+value);
                setCategory(undefined);
              }}
            />
          </SelectContainer>
          <SelectContainer>
            <Select
              ariaLabel="Select a category"
              items={categoriesList}
              disabled={loading}
              onChange={(selectedCategory) =>
                setCategory(selectedCategory + "")
              }
            />
          </SelectContainer>
        </Container>
      </FlexItem>

      <HeadingContainer>
        <Container>
          <h1>Publications</h1>
        </Container>
      </HeadingContainer>

      {loading ? (
        <Loading />
      ) : (
        <CardContainer>
          {publications?.publications.length
            ? publications.publications.map((item) => (
                <Card key={item.id} publication={item} />
              ))
            : "No results!"}
        </CardContainer>
      )}

      <FlexItem>
        <PaginationContainer>
          {publications?.pagination?.total ? (
            <Pagination
              totalPages={publications.pagination.page_count}
              currentPage={publications.pagination.page}
              onPageChange={(page) => setPage(page)}
            />
          ) : (
            ""
          )}
        </PaginationContainer>
      </FlexItem>
    </FlexContainer>
  );
}
