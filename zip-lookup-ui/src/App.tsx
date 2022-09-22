import './App.css';

import { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { countryCodes } from './helpers/contants';
import { Place } from './place/Place';

function Page() {

  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("us");
  const [form, setForm] = useState({ postalCode: "", countryCode: "" })

  const countries = countryCodes.map(country => (
    <MenuItem key={country[0]} value={country[0]}>{country[1]}</MenuItem>
  ))

  return (
    <Grid
      marginTop={1}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}>
      <Grid item>
        <Typography variant="h5" >Postal / Zip code lookup </Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <Grid container direction="column" spacing={3} >
            <Grid item>
              <InputLabel id="country-label">Country</InputLabel>
              <Select fullWidth labelId="country-label" value={countryCode} label="Country" onChange={e => setCountryCode(e.target.value)}>
                {countries}
              </Select>
            </Grid>
            <Grid item>
              <TextField variant="outlined" placeholder="Postal / Zip Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
            </Grid>
            <Grid item alignSelf="center">
              <Button variant="contained" onClick={() => setForm({ postalCode, countryCode })}>Submit</Button>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item>
        <Place postCode={form.postalCode} countryCode={form.countryCode} />
      </Grid>
    </Grid>
  )
}

export default function App() {
  return (
    <div>
      <Page />
    </div>
  )
}