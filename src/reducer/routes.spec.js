import reducer from './routes'

const routes = [{
        description: "Barcelona a Martorell"
    },
    {
        description: "Barcelona a Francia"
    },
    {
        description: "Barcelona a Cuenca"
    }
];
const route = {
    description: "Barcelona a Martorell"
};


describe('Routes Reducer', () => {
    test('returns a state object', () => {
        const result = reducer(undefined, {
            type: 'ANYTHING'
        })
        expect(result).toBeDefined()
    })

    test('fetch routes', () => {
        const startState = {
            routes: []
        }
        const expectedState = {
            routes
        }
        const action = {
            type: 'ROUTE_ADD',
            payload: routes
        }
        const result = reducer(startState, action)
        expect(result).toEqual(expectedState)
    })

    test('select a route', () => {
        const startState = {
            currentRoute: null
        }
        const expectedState = {
            currentRoute: route
        }
        const action = {
            type: 'ROUTE_SELECT',
            payload: route
        }
        const result = reducer(startState, action)
        expect(result).toEqual(expectedState)
    })

    test('loading state', () => {
        const startState = {
            loading: false
        }
        const expectedState = {
            loading: true
        }
        const action = {
            type: 'LOADING_STATE',
            payload: true
        }
        const result = reducer(startState, action)
        expect(result).toEqual(expectedState)
    })

})