import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';

const columns = [
  // {
  //   Header: "Address",
  //   accessor: "Address"
  // },
  // {
  //   Header: "Time",
  //   accessor: "time"
  // },
  {
    id: "home_abandoned",
    Header: "Abandoned House",
    accessor: x => x.home_abandoned ? String.fromCharCode(10004) : ""
  },
  {
    id: "home_bars",
    Header: "Bars on Doors and/or Windows",
    accessor: x => x.home_bars ? String.fromCharCode(10004) : ""
  },
  {
    id: "home_broken_windows",
    Header: "Broken Windows",
    accessor: x => x.home_broken_windows ? x.home_broken_windows : ""
  },
  {
    id: "home_condition",
    Header: "Housing Condition Issue",
    accessor: x => x.home_condition ? x.home_condition : ""
  },
  {
    id: "home_disrepair",
    Header: "Home in Disrepair",
    accessor: x => x.home_disrepair ? String.fromCharCode(10004) : ""
  },
  {
    id: "home_for_sale",
    Header: "House for Sale",
    accessor: x => x.home_for_sale ? String.fromCharCode(10004) : ""
  },
  {
    id: "home_renovated",
    Header: "Evidence of Renovation",
    accessor: x => x.home_renovated ? String.fromCharCode(10004) : ""
  },
  {
    id: "home_solar",
    Header: "Solar Adaptation",
    accessor: x => x.home_solar ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_basketball_goals",
    Header: "Basketball Goals",
    accessor: x => x.misc_basketball_goals ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_benchmark",
    Header: "Good Practice/Benchmark",
    accessor: x => x.misc_benchmark ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_bus_stop",
    Header: "Bus Stop",
    accessor: x => x.misc_bus_stop ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_equipment_storage",
    Header: "Equipment Storage",
    accessor: x => x.misc_equipment_storage ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_gentrification",
    Header: "Gentrification",
    accessor: x => x.misc_gentrification ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_need_beautification",
    Header: "Beautification Needed",
    accessor: x => x.misc_need_beautification ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_noise",
    Header: "Abnormal Noise Levels",
    accessor: x => x.misc_noise ? String.fromCharCode(10004) : ""
  },
  {
    id: "misc_vacant_lot",
    Header: "Vacant Lot",
    accessor: x => x.misc_vacant_lot ? String.fromCharCode(10004) : ""
  },
  {
    id: "street_disrepair",
    Header: "Street in Disrepair",
    accessor: x => x.street_disrepair ? String.fromCharCode(10004) : ""
  },
  {
    id: "street_drain_blocked",
    Header: "Storm Drain Blocked",
    accessor: x => x.street_drain_blocked ? String.fromCharCode(10004) : ""
  },
  {
    id: "street_hydrant_oos",
    Header: "Fire Hydrant Out of Service",
    accessor: x => x.street_hydrant_oos ? String.fromCharCode(10004) : ""
  },
  {
    id: "street_no_sidewalks",
    Header: "No Sidewalks",
    accessor: x => x.street_no_sidewalks ? String.fromCharCode(10004) : ""
  },
  {
    id: "vehicle_abandoned_driveway",
    Header: "Vehicle Abandoned (Driveway)",
    accessor: x => x.vehicle_abandoned_driveway ? String.fromCharCode(10004) : ""
  },
  {
    id: "vehicle_abandoned_other",
    Header: "Vehicle Abandoned (Other)",
    accessor: x => x.vehicle_abandoned_other ? String.fromCharCode(10004) : ""
  },
  {
    id: "vehicle_abandoned_street",
    Header: "Vehicle Abandoned (Street)",
    accessor: x => x.vehicle_abandoned_street ? String.fromCharCode(10004) : ""
  },
  {
    id: "vehicle_oversized",
    Header: "Oversized Vehicle",
    accessor: x => x.vehicle_oversized ? String.fromCharCode(10004) : ""
  },
  {
    id: "vehicle_parked",
    Header: "Cars Parked in Front Yard",
    accessor: x => x.vehicle_parked ? x.vehicle_parked : ""
  },
  {
    id: "yard_abandoned_appliance",
    Header: "Abandoned Applicance in Yard",
    accessor: x => x.yard_abandoned_appliance ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_abandoned_equipment",
    Header: "Abandoned Equipment in Yard",
    accessor: x => x.yard_abandoned_equipment ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_debris",
    Header: "Debris in Yard",
    accessor: x => x.yard_debris ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_landscaping",
    Header: "Landscaping Issue",
    accessor: x => x.yard_landscaping ? x.yard_landscaping : ""
  },
  {
    id: "yard_standing_water",
    Header: "Standing Water",
    accessor: x => x.yard_standing_water ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_trash",
    Header: "Trash and/or Junk Pile",
    accessor: x => x.yard_trash ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_tree_loss",
    Header: "Tree Loss",
    accessor: x => x.yard_tree_loss ? String.fromCharCode(10004) : ""
  },
  {
    id: "yard_unused_green",
    Header: "Unused Green",
    accessor: x => x.yard_unused_green ? String.fromCharCode(10004) : ""
  },
]

class Table extends React.Component {

  state = {data: []}

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <ReactTable
        data={this.state.data}
        columns={columns}
      />
    );
  }

  async fetchData() {
    firebase.initializeApp({
      apiKey: "AIzaSyAlSgRTpk10xfFiDHUzaq7HBj1S02kUK0A",
      authDomain: "jr-design.firebaseapp.com",
      databaseURL: "https://jr-design.firebaseio.com",
      projectId: "jr-design",
      storageBucket: "jr-design.appspot.com",
      messagingSenderId: "384307097591",
      appId: "1:384307097591:web:1da8b47f70cd8fab1ec8f2",
      measurementId: "G-QVXX7D5HND"  
    });
    const data = await firebase.database().ref('/reports').once('value');

    this.setState({data: Object.values(data.val())});
  }
}

export default Table;
