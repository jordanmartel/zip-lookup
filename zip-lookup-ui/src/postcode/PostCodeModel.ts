export interface PostCode { 
    country: string,
    countryAbbrev: string,
    postCode: string,
    places: Place[]
}

export interface Place {
    name: string,
    longitude: string,
    state: string,
    stateAbbrev: string,
    latitude: string
}