import qs from "qs";
import { foleon } from "./index";
import { APIPagination, APILink } from "./types";

export interface APIProjects extends APIPagination {
  _embedded: {
    title: APIProject[];
  };
  _computed: {
    background_color: string;
    editions_count: number;
    editions_published_count: number;
  };
}

export interface APIProject {
  id: number;
  name: string;
  identifier: string;
  created_on: string;
  modified_on: string;
  _embedded: {
    account: {
      id: number;
      _links: {
        self: APILink;
      };
    };
    editions: {
      _links: {
        self: APILink;
      };
    };
  };
}

export const fetchProjects = async () => {
  const { data } = await foleon.get<APIProjects>(
    `/v2/magazine/title?${qs.stringify({
      "order-by": [
        {
          field: "name",
          type: "field",
          direction: "ASC",
        },
      ],
    })}`,
  );

  return {
    projects: data._embedded.title,
  };
};
