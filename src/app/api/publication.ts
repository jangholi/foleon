import qs from "qs";
import { foleon } from "./index";
import { APIPagination, APILink } from "./types";

export interface APIPublicationResponse extends APIPagination {
  _embedded: {
    edition: APIPublication[];
  };
}

export interface APIPublication {
  id: number;
  name: string;
  uid: string;
  identifier: string;
  created_on: string;
  modified_on: string;
  published_on: string | null;
  category: string;
  status: string;
  is_visible: boolean;
  is_default: boolean;
  _embedded: {
    title: {
      id: number;
    };
    pages: {
      _links: {
        self: APILink;
        published: APILink;
      };
    };
    screenshot: {
      _links: {
        original: APILink;
        desktop: APILink;
        full: APILink;
      };
    };
  };
  _links: {
    self: APILink;
    published: APILink;
  };
  _computed: {
    num_unresolved_comments: number;
  };
}

export const fetchPublications = async (filters: {
  project?: number;
  search?: string;
  category?: string;
  page?: number;
}) => {
  const query = {
    page: filters.page ?? 1,
    limit: 4,
    filter: [] as unknown[],
  };

  if (filters.project) {
    query.filter.push({
      field: "title",
      type: "eq",
      value: filters.project,
    });
  }

  if (filters.search) {
    query.filter.push({
      field: "name",
      type: "like",
      value: `%${filters.search}%`,
    });
  }

  if (filters.category) {
    query.filter.push({
      field: "category",
      type: "eq",
      value: filters.category,
    });
  }

  const { data } = await foleon.get<APIPublicationResponse>(
    `v2/magazine/edition?${qs.stringify(query)}`,
  );

  return {
    publications: data._embedded.edition,
    pagination: {
      page_count: data.page_count,
      page: data.page,
      page_size: data.page_size,
      total_items: data.total_items,
      count: data.count,
      total: data.total,
      _links: data._links,
    } satisfies APIPagination,
  };
};
