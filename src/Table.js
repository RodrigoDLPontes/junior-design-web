import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const checkmark = String.fromCharCode(10004);

const columns = [
  {
    Header: "Address",
    accessor: "address",
    width: 300
  },
  // {
  //   Header: "Time",
  //   accessor: "time"
  // },
  {
    id: "home_abandoned",
    Header: "Abandoned House",
    accessor: x => x.home_abandoned ? checkmark : ""
  },
  {
    id: "home_bars",
    Header: "Bars on Doors and/or Windows",
    accessor: x => x.home_bars ? checkmark : ""
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
    accessor: x => x.home_disrepair ? checkmark : ""
  },
  {
    id: "home_for_sale",
    Header: "House for Sale",
    accessor: x => x.home_for_sale ? checkmark : ""
  },
  {
    id: "home_renovated",
    Header: "Evidence of Renovation",
    accessor: x => x.home_renovated ? checkmark : ""
  },
  {
    id: "home_solar",
    Header: "Solar Adaptation",
    accessor: x => x.home_solar ? checkmark : ""
  },
  {
    id: "misc_basketball_goals",
    Header: "Basketball Goals",
    accessor: x => x.misc_basketball_goals ? checkmark : ""
  },
  {
    id: "misc_benchmark",
    Header: "Good Practice/Benchmark",
    accessor: x => x.misc_benchmark ? checkmark : ""
  },
  {
    id: "misc_bus_stop",
    Header: "Bus Stop",
    accessor: x => x.misc_bus_stop ? checkmark : ""
  },
  {
    id: "misc_equipment_storage",
    Header: "Equipment Storage",
    accessor: x => x.misc_equipment_storage ? checkmark : ""
  },
  {
    id: "misc_gentrification",
    Header: "Gentrification",
    accessor: x => x.misc_gentrification ? checkmark : ""
  },
  {
    id: "misc_need_beautification",
    Header: "Beautification Needed",
    accessor: x => x.misc_need_beautification ? checkmark : ""
  },
  {
    id: "misc_noise",
    Header: "Abnormal Noise Levels",
    accessor: x => x.misc_noise ? checkmark : ""
  },
  {
    id: "misc_vacant_lot",
    Header: "Vacant Lot",
    accessor: x => x.misc_vacant_lot ? checkmark : ""
  },
  {
    id: "street_disrepair",
    Header: "Street in Disrepair",
    accessor: x => x.street_disrepair ? checkmark : ""
  },
  {
    id: "street_drain_blocked",
    Header: "Storm Drain Blocked",
    accessor: x => x.street_drain_blocked ? checkmark : ""
  },
  {
    id: "street_hydrant_oos",
    Header: "Fire Hydrant Out of Service",
    accessor: x => x.street_hydrant_oos ? checkmark : ""
  },
  {
    id: "street_no_sidewalks",
    Header: "No Sidewalks",
    accessor: x => x.street_no_sidewalks ? checkmark : ""
  },
  {
    id: "vehicle_abandoned_driveway",
    Header: "Vehicle Abandoned (Driveway)",
    accessor: x => x.vehicle_abandoned_driveway ? checkmark : ""
  },
  {
    id: "vehicle_abandoned_other",
    Header: "Vehicle Abandoned (Other)",
    accessor: x => x.vehicle_abandoned_other ? checkmark : ""
  },
  {
    id: "vehicle_abandoned_street",
    Header: "Vehicle Abandoned (Street)",
    accessor: x => x.vehicle_abandoned_street ? checkmark : ""
  },
  {
    id: "vehicle_oversized",
    Header: "Oversized Vehicle",
    accessor: x => x.vehicle_oversized ? checkmark : ""
  },
  {
    id: "vehicle_parked",
    Header: "Cars Parked in Front Yard",
    accessor: x => x.vehicle_parked ? x.vehicle_parked : ""
  },
  {
    id: "yard_abandoned_appliance",
    Header: "Abandoned Applicance in Yard",
    accessor: x => x.yard_abandoned_appliance ? checkmark : ""
  },
  {
    id: "yard_abandoned_equipment",
    Header: "Abandoned Equipment in Yard",
    accessor: x => x.yard_abandoned_equipment ? checkmark : ""
  },
  {
    id: "yard_debris",
    Header: "Debris in Yard",
    accessor: x => x.yard_debris ? checkmark : ""
  },
  {
    id: "yard_landscaping",
    Header: "Landscaping Issue",
    accessor: x => x.yard_landscaping ? x.yard_landscaping : ""
  },
  {
    id: "yard_standing_water",
    Header: "Standing Water",
    accessor: x => x.yard_standing_water ? checkmark : ""
  },
  {
    id: "yard_trash",
    Header: "Trash and/or Junk Pile",
    accessor: x => x.yard_trash ? checkmark : ""
  },
  {
    id: "yard_tree_loss",
    Header: "Tree Loss",
    accessor: x => x.yard_tree_loss ? checkmark : ""
  },
  {
    id: "yard_unused_green",
    Header: "Unused Green",
    accessor: x => x.yard_unused_green ? checkmark : ""
  }
]

class Table extends React.Component {

  state = { data: [] }

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
    const data = await this.props.firebase.database().ref('/reports').once('value');
    const dataArr = Object.values(data.val());
    this.setState({data: dataArr});
  }
}

export default Table;
