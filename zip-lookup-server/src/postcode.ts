export interface Place {
    name: string,
    longitude: string,
    state: string,
    stateAbbrev: string,
    latitude: string
}

export interface PostCode {
    postCode: string
    country: string
    countryAbbrev: string
    places: any
}