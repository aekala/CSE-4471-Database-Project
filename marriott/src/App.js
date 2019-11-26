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
    let data = [];
    for (let i = 0; i < this.state.data.length; i++) {
      const person = this.state.data[i];
      data[i] = {
        firstname: person.FirstName,
        lastname: person.LastName,
        streetaddress: person.StreetAddress,
        city: person.City,
        state: person.State,
        zipcode: person.ZipCode,
        birthdate: person.BirthDate,
        member: person.Member,
        homenumber: person.HomePhoneNumber,
        cellnumber: person.CellNumber,
        passportnumber: person.PassportNumber,
        creditcardnumber: person.CreditCardNumber,
      }
    }

    const columns = [{
      Header: 'First Name',
      accessor: 'firstname' // String-based value accessors!
    }, {
      Header: 'Last Name',
      accessor: 'lastname',
    }, {
      Header: 'Street Address',
      accessor: 'streetaddress',
    }, {
      Header: 'City',
      accessor: 'city',
    }, {
      Header: 'State',
      accessor: 'state',
    }, {
      Header: 'Zip Code',
      accessor: 'zipcode',
    }, {
      Header: 'Birth Date',
      accessor: 'birthdate',
    }, {
      Header: 'Member',
      accessor: 'member',
    }, {
      Header: 'Home Number',
      accessor: 'homenumber',
    }, {
      Header: 'Cell Number',
      accessor: 'cellnumber',
    }, {
      Header: 'Passport Number',
      accessor: 'passportnumber',
    }, {
      Header: 'Credit Card Number',
      accessor: 'creditcardnumber',
    }]

    return <ReactTable data={data} columns={columns} />
  }
}

export default App;
