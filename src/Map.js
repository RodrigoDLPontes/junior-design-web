import React from 'react';
import GoogleMapReact from 'google-map-react';
import key from './GoogleMapsKey';

class Map extends React.Component {

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{key}}
          defaultCenter={{lat: 36.9339, lng: -76.3637}}
          defaultZoom={11}
          onGoogleApiLoaded={this.renderMarkers}/>
      </div>
    )
  }

  renderMarkers = ({map, maps}) => {
    // Get reports from DB (probably using fetch())
    // For each report, create a marker like below
    new maps.Marker({position: {lat: 36.9339, lng: -76.3637}, map});
  }
}

export default Map;