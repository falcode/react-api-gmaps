import isEqual from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {setTime} from '../utils/shared';

// const key = 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA'; // seat key
const key = 'AIzaSyA_8TDaH8ZovPT4TO0rZdBNCdSND3G31kM'; // mine key
const travelMode = 'DRIVING';
const origin = 'Origen';
const destiny = 'Destino';
const stopper = 'Parada'

export class MapUnconnected extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.markers = [];
    }

    onScriptLoad() {
        this.renderMap();
    }
    
    componentDidUpdate(prevProps) {
        if (isEqual(this.props.currentRoute,prevProps.currentRoute)) { // checking if the current route has changed
            this.markers.forEach(marker => marker.setMap(null)); // cleaning markers from the map
            this.markers = [];
            this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer, this.props.currentRoute);
        }
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

    renderMap() {
        this.directionsService = new window.google.maps.DirectionsService(); // gets a DirectionsRequest query to returns a DirectionsResult
        this.directionsRenderer = new window.google.maps.DirectionsRenderer({suppressMarkers: true}); // gets a DirectionsResult to set them on the Map (default markers are hidden)
        this.map = new window.google.maps.Map( 
            document.getElementById(this.props.id), // DOM item where is gonna display the map
                { // Initial map coordinates
                    center: {lat: 41.381459, lng: 2.185579},
                    zoom: 14,
                    streetViewControl: false
                }  
            );
        this.directionsRenderer.setMap(this.map);
    }

    calculateAndDisplayRoute(directionsService, directionsRenderer, route){
        const newRoute = {
            origin: this.pointToCoordinates(route.origin.point),
            destination: this.pointToCoordinates(route.destination.point),
            travelMode: travelMode,
            waypoints: this.stopPointsToCoordinates(route.stops)
        };
        directionsService.route( newRoute, (res, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(res); // establishing route on the map
                    this.pointsToMarkers(route); // establishing markers on the map
                } else {
                    console.log('Direction request failed due to ' + status);
                }
            }
        )
    }

    pointsToMarkers(route){
        //origin marker
        this.addMarkerToMap(route, 0, origin);
        //stops markers
        route.stops.forEach((stop, i) => {
            this.addMarkerToMap(stop, i + 1, stopper)
        });
        //destination marker
        this.addMarkerToMap(route, route.stops.length + 1, destiny);
    }

    addMarkerToMap(point, label, type) {
        const infowindow = new window.google.maps.InfoWindow({
            content: this.generateStopInfoPopup(point, type)
        });
        point = ((type === origin ) ? point.origin : ((type === destiny) ? point.destination : point));
        const marker = new window.google.maps.Marker({
            position: this.pointToCoordinates(point.point),
            infowindow,
            map: this.map,
            label: String(label)
        });

        this.markers.push(marker);

        marker.addListener('click', () => { 
            this.hideAllInfoWindows(); // I feel more comfortable closing the possible popups opened
            infowindow.open(this.map, marker);
        });
    }

    hideAllInfoWindows() {
        this.markers.forEach((marker) =>
          marker.infowindow.close(this.map, marker)
        ); 
     }
    
    generateStopInfoPopup(stop, type) {
        let content = '';
        if (type === origin){ // Popup info type: Origin / Destination
            content = 
                '<p>' + type +': <b>' + (stop.origin.hasOwnProperty('address') ?  stop.origin.address : 'No hay datos') + '</b></p>' +
                ('<p>Hora salida: <b>' + (stop.hasOwnProperty('startTime') ? setTime(stop.startTime) : 'No hay datos') + '</b></p>');

        } else if (type === destiny) {
            content =
                '<p>' + type +': <b>' + (stop.destination.hasOwnProperty('address') ? stop.destination.address : 'No hay datos') + '</b></p>' +
                ('<p>Hora llegada: <b>' + (stop.hasOwnProperty('endTime') ? setTime(stop.endTime) : 'No hay datos') + '</b></p>')

        } else if (type === stopper) { // Popup info type: Stop
            content =  
                '<p>Cliente: <b>' + (stop.hasOwnProperty('userName') ? stop.userName : 'No hay datos') + '</b></p>' +
                '<p>Pagado: <b>' + (stop.hasOwnProperty('paid') ? (stop.paid ? 'Sí' : 'No') : 'No hay datos') + '</b></p>' +
                '<p>' + type +': <b>' + (stop.hasOwnProperty('address') ? stop.address : 'No hay datos') + '</b></p>' +
                '<p>Hora: <b>' + (stop.hasOwnProperty('stopTime') ? setTime(stop.stopTime) : 'No hay datos') + '</b></p>' +
                '<p>Precio: <b>' + (stop.hasOwnProperty('price') ? (parseFloat(stop.price) + '€') : 'No hay datos') + '</b></p>';
        }

        return content;
    }

    stopPointsToCoordinates(stops) {
        const waypoints = (stops.map(stop => 
            stop && stop.point && { location: this.pointToCoordinates(stop.point), stopover: true}
        )).filter(stop => stop );
        return waypoints;

    }

    pointToCoordinates(point) {
        return {lat: parseFloat(point._latitude), lng: parseFloat(point._longitude)};
    }

    render() {
        return(
            <div className="MapComponent" id={this.props.id} />
        )
    }
}

const Map = connect(
    (state) => ({
        currentRoute: state.routes.currentRoute
    }),
)(MapUnconnected);

export default Map;