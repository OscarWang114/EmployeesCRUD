import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReactBootstrap from 'react-bootstrap';
import {Button, ControlLabel, FormGroup, FormControl,
Radio} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BlankForm from './BlankForm.jsx';
import DeveloperForm from './DeveloperForm.jsx';
import ProjectManagerForm from './ProjectManagerForm.jsx';
import SalesPersonForm from './SalesPersonForm.jsx';


class FormTypes extends React.Component{
	render(){
		{/*Creating the form based on the type of employees selected.*/}
    const FormType = this.props.type;
		return(
			<FormType employee={this.props.employee} submit={this.props.updateEmployee}></FormType>
		);
	}
}

export default class EmployeeEdit extends React.Component{
  constructor(props){
		super(props);

		this.state={
      type: BlankForm,
      employee: {
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
    };
		this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
		this.renderDev = this.renderDev.bind(this);
		this.renderProj = this.renderProj.bind(this);
		this.renderSale = this.renderSale.bind(this);
	}

  render(){
    return(
      <div>
        <h1>Edit Employee: {this.props.match.params.id}</h1>
        <br/>
        <h4 className="pull-left"><em><strong>* Required</strong></em></h4>
        <Link to="/" className="pull-right"><h4>Back to Employee Table</h4></Link>
				<div className="clearfix"></div>
        <br/>
        <form name="EmployeeForm">
          <FormGroup controlId="employeeTypes">
            <ControlLabel>* Employee Types</ControlLabel><br/>
            <Radio name="employeeType" value="Developer" onClick={this.renderDev} inline>Developer</Radio>
            <Radio name="employeeType" value="Project Manager" onClick={this.renderProj} inline>Project Manager</Radio>
            <Radio name="employeeType" value="Sales Person" onClick={this.renderSale} inline>Sales Person</Radio>
          </FormGroup>
          <FormTypes type={this.state.type} employee={this.state.employee} updateEmployee={this.updateEmployee}></FormTypes>
          <Button className="pull-right" bsStyle="warning" onClick={this.deleteEmployee}>Delete Employee</Button>
        </form>
      </div>
    );
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    var employeeTypes = {
      'Developer': DeveloperForm,
      'Project Manager': ProjectManagerForm,
      'Sales Person': SalesPersonForm
    }
		//Loading the information of the employee with an ajax call.
    $.ajax('/api/employees/' + this.props.match.params.id).done(function (data){
      console.log(data.type);
      var employeeType = data.type;
      this.setState({
        type: employeeTypes[employeeType],
        employee: data
      });
      //pre-selecting the radio button
      $("input[name=employeeType][value='" + employeeType + "']").prop('checked', 'true');
    }.bind(this));
  }

  renderDev(){
    console.log('renderDev called');
		this.setState({type: DeveloperForm});
	}
	renderProj(){
    console.log('renderProj called');
		this.setState({type: ProjectManagerForm});
	}
	renderSale(){
    console.log('renderSale called');
		this.setState({type: SalesPersonForm});
	}

	updateEmployee(employee){
		$.ajax({
			type: 'PUT', url: '/'+ this.props.match.params.id, contentType:'application/json',
			data: JSON.stringify(employee),
			success: function (data) {
        console.log("Updated employee: ", data);
				alert("Success.");
				window.location.replace('/');
			}.bind(this),
			error: (jqXHR, textStatus, errorThrown) => {
				alert("Error updating employee.");
				console.log("Error updating employee: ", errorThrown);
			}
		});
	}
	
  deleteEmployee(e){
    e.preventDefault();
    var result = confirm("Are you sure you want to delete this employee?");
    if(result){
      $.ajax({
  			type: 'DELETE', url: '/'+ this.props.match.params.id,
  			success: function (result) {
  				console.log("Deleted employee", result);
          alert("Success.");
  				window.location.replace('/');
  			}.bind(this),
  			error: (jqXHR, textStatus, errorThrown) => {
  				alert("Error deleting employee.");
  				console.log("Error deleting employee: ", errorThrown);
  			}
  		});
    }
  }
}
