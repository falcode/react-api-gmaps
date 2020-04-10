import './App.scss'; 
import Map from './components/Map';
import Route from './components/Route';

import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchRoutes} from './reducer/routes';


export class App extends Component {
  componentDidMount(){
    this.props.fetchRoutes();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Seat : CODE Challenge
        </header>
        {this.props.loading && 
          <div className="loading">
            <h1>Loading
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </h1>
          </div>
        }
        <div className="container">

          <Map id="myMap" />
          { this.props.routes && this.props.routes.length &&
            <div className="container-list">
              {this.props.routes.map((route, i) =>
                <Route key={i} route={route}/>
              )}
            </div>
          }

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    routes: state.routes.routes, 
    loading: state.routes.loading
  }),
  {fetchRoutes}  
)(App)
