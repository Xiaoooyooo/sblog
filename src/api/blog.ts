import request from "./request";
import { gql } from "@apollo/client";

interface Doc {
  contents: string;
  fullPath: string;
  name: string;
  __typename: string;
}

export function getBlogInfo(doc: string) {
  return request.query<{ doc: Doc }>({
    query: gql`
    {
      doc (fullPath: "${doc}"){ 
       name
        fullPath
        contents
      }
    }
`,
  });
}
