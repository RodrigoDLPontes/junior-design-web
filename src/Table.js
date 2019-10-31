import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [
  {
    Header: "Address",
    accessor: "address"
  },
  {
    Header: "Time",
    accessor: "time"
  },
  {
    Header: "Category",
    accessor: "category"
  }
]

class Table extends React.Component {

  state = {data: []}

  componentDidMount() {
    // Get reports from DB (probably using fetch())
    // Then set state like below
    this.setState({data: [
      {
        address: "123 Techwood Dr",
        time: "12:34 PM",
        category: "Broken Window"
      }
    ]})
  }

  render() {
    return (
      <ReactTable
        data={this.state.data}
        columns={columns}
      />
    );
  }
}

export default Table;