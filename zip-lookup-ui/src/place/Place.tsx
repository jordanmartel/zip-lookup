import { useQuery } from "@apollo/client";
import { GET_POSTCODE_QUERY } from "../gql/queries";

interface PlaceQueryProperties {
    postCode: string
    countryCode: string
  }
  
export interface Place {
    name: string,
    longitude: string,
    state: string,
    stateAbbrev: string,
    latitude: string
}
  
  
export function Place({postCode, countryCode}: PlaceQueryProperties) { 

    const { loading, error, data } = useQuery(GET_POSTCODE_QUERY, { variables: { postCode, countryCode }, skip: !postCode || !countryCode}, );
    if (!postCode || !countryCode) {
        return
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Invalid postal code</p>;

    return data.postcode.places.map((place: Place) => (
        <div key={place.name}>
        <b>City</b>
        <p>{place.name}</p>
        <br />
        <b>Province / State</b>
        <p>{place.state}</p>
        <br />
        </div>
    ))

}