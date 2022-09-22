import { gql } from "@apollo/client";

export const GET_POSTCODE_QUERY = gql`
  query Postcode($postCode: String!, $countryCode: String!) {
    postcode(postCode: $postCode, countryCode: $countryCode) {
      postCode
      country
      countryAbbrev
      places {
        name
        state
      }
    }
  }
`;