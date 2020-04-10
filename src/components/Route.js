import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStops} from '../reducer/routes';


export class Route extends Component {
    render() {
        const route = this.props.route;
        return(
            <div className={`RouteComponent ${this.props.loading ? "unclickable" : ""}`} 
            onClick={() => this.props.fetchStops(route)}>
                <p>{route.driverName}</p>
                <p>{route.description}</p>
                <p>{setTime(route.startTime)} - {setTime(route.endTime)}</p>
                <p>Paradas: {route.stops.length}</p>
            </div>
        )
    }
}

export function setTime(date) {
    var d = new Date(date);
    return(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
}

export function addZero(i) {
    return (i < 10) ? "0" + i : i;
}


export default connect(
    (state) => ({
        currentRoute: state.routes.currentRoute, 
        loading: state.routes.loading
    }),
    {fetchStops}
)(Route);