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

  renderMarkers = ({map, maps}) => this.fetchData(map, maps);

  async fetchData(map, maps) {
    const data = await this.props.firebase.database().ref('/reports').once('value');
    const dataArr = Object.values(data.val());
    dataArr.forEach(report => {
      const { latitude: lat, longitude: lng } = report.location;
      new maps.Marker({position: {lat, lng}, map})
    });
  }
}

export default Map;