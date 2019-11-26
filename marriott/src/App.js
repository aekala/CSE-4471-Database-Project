import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Client from "./Client";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const data2 = Client.search();
    data2.then(result => {
      this.setState({
        data: result,
      })
    });
  }

  render() {
    console.log(this.state.data);
      const data = [{
      firstname: 'Tanner',
      lastname: 'Linsely',
    },{
      firstname: 'Leo',
      lastname: 'Kodish'
    }]

    const columns = [{
      Header: 'First Name',
      accessor: 'firstname' // String-based value accessors!
    }, {
      Header: 'Last Name',
      accessor: 'lastname',
    }]

    return <ReactTable data={data} columns={columns} />
  }
}

export default App;
