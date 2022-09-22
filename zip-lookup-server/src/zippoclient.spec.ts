import { describe, it, jest, expect } from '@jest/globals';
import { AxiosError, AxiosStatic } from 'axios';
import { ZippoClient } from './zippoclient';

describe('ZippoClient', () => {
    describe('getPostCode', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        })
        it('Calls axios.get, calls zippoPostCodeToPostCode with the result and returns the result', async () => {

            const fakeAxios = {
                get: () => { }
            }

            const getSpy = jest.spyOn(fakeAxios, 'get').mockImplementationOnce(() => {
                return Promise.resolve({
                    data: {
                        "post code": 'postCode'
                    }
                })
            })

            const tested = new ZippoClient('http://localhost:8080', fakeAxios as unknown as AxiosStatic);

            const fakeResult = {
                postCode: 'postCode',
                places: [],
                country: 'countryName',
                countryAbbrev: 'countryCode'
            }
            const zippoPostCodeToPostCodeSpy = jest.spyOn(tested, 'zippoPostCodeToPostCode').mockImplementationOnce(() => {
                return fakeResult
            })

            const result = await tested.getPostCode('postCode', 'countryCode');

            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy).toHaveBeenCalledWith('http://localhost:8080/countryCode/postCode');

            expect(zippoPostCodeToPostCodeSpy).toHaveBeenCalledTimes(1);
            expect(zippoPostCodeToPostCodeSpy).toHaveBeenCalledWith({ "post code": 'postCode' });

            expect(result).toBe(fakeResult);

        })
        it('Throws readable error when request fails', async () => {

            const fakeAxios = {
                get: () => { }
            }
            const getSpy = jest.spyOn(fakeAxios, 'get').mockImplementationOnce(() => {
                return Promise.reject(new AxiosError('Something went wrong!', '500'));
            })
            const tested = new ZippoClient('http://localhost:8080', fakeAxios as unknown as AxiosStatic);
            const zippoPostCodeToPostCodeSpy = jest.spyOn(tested, 'zippoPostCodeToPostCode');

            try {
                await tested.getPostCode('postCode', 'countryCode');
                fail('Expected an error!');
            }
            catch (error) {
                expect(error).toEqual(new Error(`API request failed with error code 500. The reason was: Something went wrong!`));
                expect(zippoPostCodeToPostCodeSpy).not.toHaveBeenCalled();
            }

        })
        it('Rethrows error if an error is caught which is not an AxiosError', async () => {

            const fakeAxios = {
                get: () => { }
            }
            const getSpy = jest.spyOn(fakeAxios, 'get').mockImplementationOnce(() => {
                return Promise.reject(new Error('Something went wrong!'));
            })
            const tested = new ZippoClient('http://localhost:8080', fakeAxios as unknown as AxiosStatic);
            const zippoPostCodeToPostCodeSpy = jest.spyOn(tested, 'zippoPostCodeToPostCode');

            try {
                await tested.getPostCode('postCode', 'countryCode');
                fail('Expected an error!');
            }
            catch (error) {
                expect(error).toEqual(new Error('Something went wrong!'));
                expect(zippoPostCodeToPostCodeSpy).not.toHaveBeenCalled();
            }

        })
    });
    describe('zippoPostCodeToPostCode', () => {
        it('Maps ZippoPostCode to PostCode, uses zippoPlaceToPlace to map ZippoPlace to Place', () => {
            const tested = new ZippoClient('http://localhost:8080');
            const zippoPlaceToPlaceSpy = jest.spyOn(tested, 'zippoPlaceToPlace');
            const result = tested.zippoPostCodeToPostCode({
                'post code': 'post code',
                country: 'country',
                'country abbreviation': 'country abbreviation',
                places: [{
                    'place name': 'name',
                    state: 'state',
                    "state abbreviation": 'state abbreviation',
                    longitude: 'longitude',
                    latitude: 'latitude'
                }]
            });

            expect(zippoPlaceToPlaceSpy).toBeCalledTimes(1);
            expect(result).toEqual({
                postCode: 'post code',
                country: 'country',
                countryAbbrev: 'country abbreviation',
                places: [
                    {
                        name: 'name',
                        state: 'state',
                        stateAbbrev: 'state abbreviation',
                        longitude: 'longitude',
                        latitude: 'latitude'
                    }
                ]

            })
        })
        it('Gracefully handles missing values', () => {
            const tested = new ZippoClient('http://localhost:8080');
            const result = tested.zippoPostCodeToPostCode({} as any);
            expect(result).toEqual({
                postCode: '',
                country: '',
                countryAbbrev: '',
                places: []
            })
        })

    })
    describe('zippoPlaceToPlace', () => {
        it('Maps ZippoPlace to Place', () => {
            const tested = new ZippoClient('http://localhost:8080');
            const result = tested.zippoPlaceToPlace({
                'place name': 'name',
                state: 'state',
                'state abbreviation': 'state abbreviation',
                latitude: 'latitude',
                longitude: 'longitude'
            });
            expect(result).toEqual({
                name: 'name',
                state: 'state',
                stateAbbrev: 'state abbreviation',
                longitude: 'longitude',
                latitude: 'latitude'
            })
        })
        it('Gracefully handles missing values', () => {
            const tested = new ZippoClient('http://localhost:8080');
            const result = tested.zippoPlaceToPlace({} as any);
            expect(result).toEqual({
                name: '',
                state: '',
                stateAbbrev: '',
                longitude: '',
                latitude: ''
            })
        })

    })
})