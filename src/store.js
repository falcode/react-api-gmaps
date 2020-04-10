import thunk from 'redux-thunk';
import routesReducer from './reducer/routes'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux';

const reducer = combineReducers({
    routes: routesReducer,
    // We can add multiple Stores
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);