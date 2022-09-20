
import axios from 'axios';
import { Place, PostCode } from './postcode';

const ZIPPO_URI = 'http://api.zippopotam.us/'

interface ZippoPlace { 
    "place name": string,
    longitude: string,
    state: string,
    "state abbreviation": string,
    latitude: string
}

interface ZippoPostCode {
    "post code": string,
    country: string,
    "country abbreviation": string,
    places: ZippoPlace[]
}

const zippoPostCodeToPostCode = (zippoPostCode: ZippoPostCode): PostCode => {
    return {
        postCode: zippoPostCode['post code'],
        country: zippoPostCode.country,
        countryAbbrev: zippoPostCode['country abbreviation'],
        places: zippoPostCode.places.map((zippoPlace) => zippoPlaceToPlace(zippoPlace))
    }
}

const zippoPlaceToPlace = (zippoPlace: ZippoPlace): Place => {
    return {
        name: zippoPlace['place name'],
        state: zippoPlace.state,
        stateAbbrev: zippoPlace['state abbreviation'],
        longitude: zippoPlace.longitude,
        latitude: zippoPlace.latitude
    }
}

export const getPostCode = async (postCode: string, countryCode: string) => {
    try {
        const resp = await axios.get(`${ZIPPO_URI}/${countryCode}/${postCode}`)
        if (!resp || !(resp.status === 200)) {
            throw new Error('Unable to find postcode');
        }
        return zippoPostCodeToPostCode(resp.data as ZippoPostCode)
    } catch (error) {
        // TODO: Provide better clarity on the error
        throw new Error('Unable to find postcode');    
    }
}