import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStops} from '../reducer/routes';
import {setTime} from '../utils/shared';


export class RouteUnconnected extends Component {
    render() {
        const route = this.props.route;
        return(
            <div className={
                `RouteComponent 
                ${this.props.loading ? "unclickable" : ""}
                ${(this.props.currentRoute && route.uniqueID === this.props.currentRoute.uniqueID) ? "routeSelected" : ""}`} 
            onClick={() => this.props.fetchStops(route)}>
                <p>{route.driverName}</p>
                <p>{route.description}</p>
                <p>{setTime(route.startTime)} - {setTime(route.endTime)}</p>
                <p>Paradas: {route.stops.length}</p>
            </div>
        )
    }
}


const Route = connect(
    (state) => ({
        currentRoute: state.routes.currentRoute, 
        loading: state.routes.loading,
    }),
    {fetchStops}
)(RouteUnconnected);
export default Route;