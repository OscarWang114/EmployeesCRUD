import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import $ from 'jquery';

export default class EmployeeTable extends React.Component{
  constructor(props){
    super(props);
		this.state={
      employees: [
        {
          _id:"",
    			firstName: "",
    			lastName: "",
    			birthDate: "",
    			numberOfEmployees: "",
    			salary: "",
    			building: "",
    			floor: "",
    			officeNumber: "",
    			clientName: ""
    	  }
      ]
    }
    this.linkCreator = this.linkCreator.bind(this);
	}

  componentDidMount(){
		$.ajax('/api/employees').done((data) => {
			this.setState({employees: data});
		});
	}

  linkCreator(cell, row){
    return (
      <Link to={'/'+row._id}>{cell}</Link>
    );
  }

  render(){
    var employeeList = this.state.employees;
    return(
      <div>
        <h1>Employees CRUD</h1>
        <hr />
        <BootstrapTable ref="employeeTable" data={employeeList} striped ={true} hover={true}>
          <TableHeaderColumn dataField="_id" isKey={true}
            width= '220'
            dataSort={true}
            dataFormat={this.linkCreator}
            >Employee ID</TableHeaderColumn>
          <TableHeaderColumn dataField="type"
            width= '150'
            dataSort={true}
            filter={ { type: 'TextFilter', delay: 1000 } }
            >Employee Type</TableHeaderColumn>
          <TableHeaderColumn dataField="firstName"
            width= '120'
            dataSort={true}
            >First Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lastName"
            width= '120'
            dataSort={true}
            >Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="birthDate"
            width= '100'
            dataSort={true}
            >Birth Date</TableHeaderColumn>
          <TableHeaderColumn dataField="numberOfEmployees"
            width= '120'
            dataSort={true}
            >Number Of<br/>Employees</TableHeaderColumn>
          <TableHeaderColumn dataField="salary"
            width= '100'
            dataSort={true}
            >Salary</TableHeaderColumn>
          <TableHeaderColumn dataField="building"
            width= '100'
            dataSort={true}
            >Building</TableHeaderColumn>
          <TableHeaderColumn dataField="floor"
            width= '100'
            dataSort={true}
            >Floor</TableHeaderColumn>
          <TableHeaderColumn dataField="officeNumber"
            width= '100'
            dataSort={true}
            >Office<br/>Number</TableHeaderColumn>
          <TableHeaderColumn dataField="clientName"
            width= '200'
            dataSort={true}
            >Client Name</TableHeaderColumn>
        </BootstrapTable>
        <hr />
        <LinkContainer to="/add">
          <Button bsStyle="primary">Add Employee</Button>
        </LinkContainer>
      </div>

    );
  }
}
