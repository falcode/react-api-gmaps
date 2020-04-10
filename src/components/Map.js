import React, {Component} from 'react';
import {connect} from 'react-redux';
import isEqual from 'lodash';

const key = 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA';
const travelMode = 'DRIVING';

export class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
    }

    onScriptLoad() {
        let directionsRenderer = new window.google.maps.DirectionsRenderer();
        const map = new window.google.maps.Map(document.getElementById(this.props.id),
            {
                center: {lat: 41.381459, lng: 2.185579}, 
                zoom: 14
            }
        );
        directionsRenderer.setMap(map);

    }

    componentDidUpdate(prevProps) {
        let directionsService = new window.google.maps.DirectionsService();
        let directionsRenderer = new window.google.maps.DirectionsRenderer();
        if (isEqual(this.props.currentRoute,prevProps.currentRoute)) {
            this.calculateAndDisplayRoute(directionsService, directionsRenderer, this.props.currentRoute);
        }
    }

    calculateAndDisplayRoute(directionsService, directionsRenderer, route) {
        directionsService.route({
            origin: route.origin.address,
            destination: route.destination.address,
            travelMode: travelMode,
            waypoints: route.stops.map(stop => 
                stop && stop.address ? 
                    { location: stop.address, stopover: true} : null
            ),
        }, (res, status) => {
            console.log(res, status);
                if (status === 'OK') {
                    directionsRenderer.setDirections(res);
                    console.log('direction added!');
                }
            }
        )
        // directionsRenderer.setDirection(route.route);


    }

    componentDidMount() {
        if (!window.google) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://maps.google.com/maps/api/js?key=${key}`;
          script.id = 'googleMaps';
          document.body.appendChild(script);
          script.addEventListener('load', () => {
            this.onScriptLoad()
          });
        } 
        else {
          this.onScriptLoad();
        }
    }

    render() {
        return(
            <div className="MapComponent" id={this.props.id} />
        )
    }
}

export default connect(
    (state) => ({
        currentRoute: state.routes.currentRoute
    }),
)(Map);