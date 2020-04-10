import {getRoutes, getStop, url, trips, stops} from './routeServices';
const fetch = require('jest-fetch-mock');
describe('route service ut fetch functions', () => {
    fetch.enableFetchMocks();
    
    beforeEach(() => {
        fetch.resetMocks();
    });
    test('calls getRoutes and uses the correct route ', () => {
    fetch.mockResponse(JSON.stringify('route'));
    const onResponse = jest.fn();
    const onError = jest.fn();
    return getRoutes()
        .then(onResponse)
        .catch(onError)
        .finally(() =>{
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
            expect(fetch.mock.calls.length).toEqual(1)
            expect(fetch.mock.calls[0][0]).toEqual(url+trips);
        })
    });

    test('calls getStop and uses the correct route ', () => {
        const id = 1;
        fetch.mockResponse(JSON.stringify('route'));
        const onResponse = jest.fn();
        const onError = jest.fn();
        return getStop(id)
            .then(onResponse)
            .catch(onError)
            .finally(() =>{
                expect(onResponse).toHaveBeenCalled();
                expect(onError).not.toHaveBeenCalled();
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual(`${url}${stops}/${id}`);
            })
        });


})