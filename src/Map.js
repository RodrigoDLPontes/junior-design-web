import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import key from './GoogleMapsKey';

const labels = {
  "address": "Address",
  "datetime": "Date",
  "details": "Details",
  "home_abandoned": "Abandoned House",
  "home_bars": "Bars on Doors or Windows",
  "home_broken_windows": "Broken Windows",
  "home_condition": "Housing Condition Issue",
  "home_disrepair": "Home in Disrepair",
  "home_for_sale": "House for Sale",
  "home_renovated": "Evidence of Renovation",
  "home_solar": "Solar Adaptation",
  "misc_basketball_goals": "Basketball Goals",
  "misc_benchmark": "Good Practice/Benchmark",
  "misc_bus_stop": "Bus Stop",
  "misc_equipment_storage": "Equipment Storage",
  "misc_gentrification": "Gentrification",
  "misc_need_beautification": "Beautification Needed",
  "misc_noise": "Abnormal Noise Levels",
  "misc_vacant_lot": "Vacant Lot",
  "street_disrepair": "Street in Disrepair",
  "street_drain_blocked": "Storm Drain Blocked",
  "street_hydrant_oos": "Fire Hydrant Out of Service",
  "street_no_sidewalks": "No Sidewalks",
  "vehicle_abandoned_driveway": "Abandoned Car in Driveway",
  "vehicle_abandoned_other": "Abandoned Car Anywhere",
  "vehicle_abandoned_street": "Abandoned Car in Street",
  "vehicle_oversized": "Oversized Vehicle",
  "vehicle_parked": "Cars Parked in Front Yard",
  "yard_abandoned_appliance": "Abandoned Applicance in Yard",
  "yard_abandoned_equipment": "Abandoned Equipment in Yard",
  "yard_debris": "Debris in Yard",
  "yard_landscaping": "Landscaping Issue",
  "yard_standing_water": "Standing Water",
  "yard_trash": "Trash and/or Junk Pile",
  "yard_tree_loss": "Tree Loss",
  "yard_unused_green": "Unused Green",
}

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
                  {labels[key]} : {this.state.data[this.state.activeInd][key].toString()}
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