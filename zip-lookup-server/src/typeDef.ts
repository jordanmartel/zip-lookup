import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Place {
    name: String
    latitude: String
    longitude: String
    state: String
    stateAbbrev: String
  }

  type PostCode {
    postCode: String
    country: String
    countryAbbrev: String
    places: [Place]
  }

  type Query {
    postcode(postCode: String!, countryCode: String!): PostCode
  }
`;