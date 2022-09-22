
import axios, { AxiosError, AxiosStatic } from 'axios';
import { Place, PostCode } from './postcode';


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


export class ZippoClient {

    private uri;
    private client = axios;

    constructor(uri: string, client?: AxiosStatic) {
        this.uri = uri
        
        // override default if provided for testing
        if (client) { 
            this.client = client
        }
    }

    zippoPostCodeToPostCode = (zippoPostCode: ZippoPostCode): PostCode => {
        
        const places = zippoPostCode.places ? zippoPostCode.places.map((zippoPlace) => this.zippoPlaceToPlace(zippoPlace)) : [];
        return {
            postCode: zippoPostCode['post code'] ?  zippoPostCode['post code'] : '' ,
            country: zippoPostCode.country ? zippoPostCode.country : '',
            countryAbbrev: zippoPostCode['country abbreviation'] ? zippoPostCode['country abbreviation'] : '',
            places
        }
    }
    
    zippoPlaceToPlace = (zippoPlace: ZippoPlace): Place => {
        return {
            name: zippoPlace['place name'] ? zippoPlace['place name'] : '',
            state: zippoPlace.state ? zippoPlace.state : '',
            stateAbbrev: zippoPlace['state abbreviation'] ? zippoPlace['state abbreviation'] : '',
            longitude: zippoPlace.longitude ? zippoPlace.longitude : '',
            latitude: zippoPlace.latitude ? zippoPlace.latitude : ''
        }
    }
    
    getPostCode = async (postCode: string, countryCode: string) => {
        try {
            const resp = await this.client.get(`${this.uri}/${countryCode}/${postCode}`)
            return this.zippoPostCodeToPostCode(resp.data as ZippoPostCode)
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(`API request failed with error code ${error.code}. The reason was: ${error.message}`);    
            }
            throw error;
        }

    }
}