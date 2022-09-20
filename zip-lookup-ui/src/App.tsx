import './App.css';

import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

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
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"> 
            <Typography variant="h4" >Select country and enter postal / zip code </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select labelId="country-label" value={countryCode} label="Country" onChange={e => setCountryCode(e.target.value)}>
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
              </Select>
              <TextField variant="outlined" value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
              <Button variant="contained" onClick={() => setForm({ postalCode, countryCode })}>Submit</Button>
            </FormControl>
            <PostCodeLocation postCode={form.postalCode} countryCode={form.countryCode} />
          </Grid>
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