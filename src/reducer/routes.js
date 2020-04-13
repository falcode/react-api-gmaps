import {getRoutes, getStop} from '../services/routeServices';
const initState = {
    routes: [],
    currentRoute: null,
    loading: false
  };

export const ROUTES_ADD = 'ROUTE_ADD';
export const ROUTE_SELECT = 'ROUTE_SELECT';
export const LOADING_STATE = 'LOADING_STATE'

export const addRoutes = (routes) => ({type: ROUTES_ADD, payload: routes});
export const selectRoute = (route) => ({type: ROUTE_SELECT, payload: route});
export const loading = (state) => ({type: LOADING_STATE, payload: state});

export const fetchRoutes = ()  => {
    return (dispatch) => {
        dispatch(loading(true));
        getRoutes().then(routes => {
            routes.forEach((route, i) => { 
                route.uniqueID = i; // adding an uniqueID
                if(!route.stops.some(stop => stop && stop.hasOwnProperty('id'))) {
                    route.stops = [] // cleaning empty objects
                }
            });
            dispatch(addRoutes(routes))
            dispatch(loading(false));  
        }, error => {
            dispatch(loading(false));  
            throw(error);
        })
    }
}

export const fetchStops = (route) => {
    return (dispatch) => {
        dispatch(loading(true));
        // Check if there are stops on the route
        if (route.stops.length) {
            Promise.all(route.stops.map((stop, i) => 
                getStop(stop.id)
                    .then(stopInfo => route.stops[i] = { ...route.stops[i], ...stopInfo })
            )).then(() => {
                dispatch(selectRoute(route));
                dispatch(loading(false));
            }, error =>{
                dispatch(loading(false));  
                throw(error);
            })
        } else {
            dispatch(selectRoute(route));
            dispatch(loading(false));
        }

    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case ROUTES_ADD:
            return {...state, routes: action.payload}
        case ROUTE_SELECT:
            return {...state, currentRoute: action.payload}
        case LOADING_STATE:
            return {...state, loading: action.payload}
        default:
            return state
    }
}