import React from 'react';
import Chart from "react-google-charts";

const barChartOptions = {
  title: "Number of reported issues per category",
  vAxis: { title: "Issue type", textStyle: {fontSize:12}},
  legend: "none",
  chartArea: {top:60}
};

const lineChartOptions = {
  title: "Reports submitted over time",
  vAxis: { title: "Count"},
  legend: "none",
  chartArea: {bottom:200}
};

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

class Charts extends React.Component {
  state = { data: [] }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <>
        <div>
          <Chart
            chartType="BarChart"
            data={this.state.barChartData}
            options={barChartOptions}
            width="100%"
            height="900px"
            legendToggle
          />
        </div>
        <div>
          <Chart
            chartType="LineChart"
            data={this.state.lineChartData}
            options={lineChartOptions}
            width="100%"
            height="600px"
            legendToggle
          />
        </div>
      </>
    );
  }

  async fetchData() {
    const data = await this.props.firebase.database().ref('/reports').once('value');
    const dataArr = Object.values(data.val());
    var barChartData = [["Issue type", "Count"]]

    for (var key in dataArr[0]) {
      if (typeof dataArr[0][key] === 'boolean') {
        barChartData.push([labels[key], dataArr.reduce((a, b) => a + b[key], 0)])
      } else if (Number.isInteger(dataArr[0][key])) {
        barChartData.push([labels[key], dataArr.reduce((a, b) => b[key] > 0 ? a + 1 : a, 0)])
      }
    }

    function BarChartComparator(a, b) {
      if (a[1] < b[1]) return 1;
      if (a[1] > b[1]) return -1;
      return 0;
    }

    barChartData = barChartData.sort(BarChartComparator);

    var reportCounts = {}

    for (let i = 0; i < dataArr.length; i++) {
      let year = dataArr[i]['datetime']['year'] + 1900;
      let month = dataArr[i]['datetime']['month'] + 1;
      let day = dataArr[i]['datetime']['date'];
      let date = `${year}-${month}-${day}`

      if (date in reportCounts) {
        reportCounts[date]++;
      } else {
        reportCounts[date] = 1;
      }
    }

    var a = Object.keys(reportCounts).map(a => [a, reportCounts[a]]);

    function LineChartComparator(a, b) {
      var c = new Date(a[0]);
      var d = new Date(b[0]);

      if (c < d) return -1;
      if (c > d) return 1;
      return 0;
    }

    a = a.sort(LineChartComparator);

    var lineChartData = [["Date", "Count"], ...a];
    console.log(lineChartData);

    this.setState({barChartData: barChartData, lineChartData: lineChartData});
  }
}

export default Charts;