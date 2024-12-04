export type APIPagination = {
  page_count: number;
  page_size: number;
  total_items: number;
  page: number;
  count: number;
  total: number;
  _links: {
    self: APILink;
    first: APILink;
    last: APILink;
  };
};

export type APILink = { href: string };
