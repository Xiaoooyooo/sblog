import request from "./request";
import { gql } from "@apollo/client";

interface MenuList {
  path: Menu;
}

export function getMenuList(path: string) {
  return request.query<MenuList>({
    query: gql`
      {
        path(fullPath: "${path}") {
          name
          fullPath
          subDocs
          subPaths
        }
      }
    `,
  });
}
