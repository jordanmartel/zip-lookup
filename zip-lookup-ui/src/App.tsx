import './App.css';

import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const GET_POSTCODE = gql`
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

interface Place {
  name: string,
  longitude: string,
  state: string,
  stateAbbrev: string,
  latitude: string
}

function Page() {

    const [postalCode, setPostalCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [form, setForm] = useState({ postalCode: "", countryCode: ""})

    return (
      <div>
        <div>
          <h1>Select country and enter postal / zip code </h1>
          <select value={countryCode} onChange={e => setCountryCode(e.target.value)}>
          <option value="us">United States</option>
            <option value="ca">Canada</option>
          </select>
          <br/>
          <br/>
          <input value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
          <br/>
          <br/>
          <button onClick={e => setForm({ postalCode, countryCode })}>Submit</button>
        </div>
        <PostCodeLocation postCode={form.postalCode} countryCode={form.countryCode} />
      </div>
    )
}

interface PostCodeLocationProperties{
  postCode: string
  countryCode: string
}

function PostCodeLocation({postCode, countryCode}: PostCodeLocationProperties) { 


  const { loading, error, data } = useQuery(GET_POSTCODE, { variables: { postCode, countryCode }, skip: !postCode || !countryCode}, );

  if (!postCode || !countryCode) {
    return (
      <div></div>
    )
  }
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Invalid postal code</p>;

  return data.postcode.places.map((place: Place) => (
    <div key={place.name}>
      <b>City</b>
      <p>{place.name}</p>
      <br />
      <b>State</b>
      <p>{place.state}</p>
      <br />
    </div>

  ))

}

export default function App() {
  return (
    <div>
    <Page />
    </div>
  )
}