import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import key from './GoogleMapsKey';

class Map extends React.Component {
  state = {
    data: [],
    windowOpen: false,
    activeInd: null,
    showInfo: false
  }

  render() {
    return (
      <div className="map">
        <this.MyMap
          data={this.state.data}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }}/>}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }

  MapComponent = () => {
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 36.9339, lng: -76.3637 }}
      >
        {this.state.data.map((report, index) => (
          <Marker
            key={index}
            position={{
              lat: report.location.latitude,
              lng: report.location.longitude
            }}
            onClick={() => {
              this.setState({
                windowOpen: true,
                activeInd: index,
                showInfo: false
              })
            }}
          />
        ))}
        {this.state.windowOpen && (
          <InfoWindow
            position={{
              lat: this.state.data[this.state.activeInd].location.latitude+0.023,
              lng: this.state.data[this.state.activeInd].location.longitude
            }}
            onCloseClick={() => {
              this.setState({
                windowOpen: false,
                activeInd: null,
                showInfo: false
              })
            }}
          >
            <div className="infoWindow">
              <h4>
                {this.state.data[this.state.activeInd].address}
              </h4>
              {this.state.showInfo && (Object.keys(this.state.data[this.state.activeInd]).map((key,ind) => (
                <p key={ind}>
                  {key} : {this.state.data[this.state.activeInd][key].toString()}
                </p>
              )))}
              <button
                onClick={(e) => {
                  this.setState({showInfo: !this.state.showInfo})
                }}
              >
                {this.state.showInfo ? ("Show less info"):("Show more info")}
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }

  MyMap = withScriptjs(withGoogleMap(this.MapComponent));

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const data = await this.props.firebase.database().ref('/reports').once('value');
    const dataArr = Object.values(data.val());
    this.setState({data: dataArr});
  }
}

export default Map;