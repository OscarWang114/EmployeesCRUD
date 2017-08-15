import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Button, ControlLabel, FormControl,
	FormGroup, Radio} from 'react-bootstrap'
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
			<FormType employee={this.props.employee} submit ={this.props.addEmployee}></FormType>
		);
	}
}

export default class EmployeeAdd extends React.Component{
	constructor(props){
		super(props);
		{/*Initializing the state*/}
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
		this.addEmployee = this.addEmployee.bind(this);
		this.renderDev = this.renderDev.bind(this);
		this.renderProj = this.renderProj.bind(this);
		this.renderSale = this.renderSale.bind(this);
	}

	render(){
		console.log("Rendering EmployeeForm");
		{/*Adjacent JSX elements must be wrapped in an enclosing tag.
			React element has to return only one element. Wrap all the tags
			with another element tag.*/}
		return(
			<div>
				<h1>Add Employee</h1>
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
					<FormTypes type={this.state.type} employee={this.state.employee} addEmployee={this.addEmployee}></FormTypes>
				</form>
			</div>
		);
	}
	renderDev(){
		this.setState({type: DeveloperForm});
	}
	renderProj(){
		this.setState({type: ProjectManagerForm});
	}
	renderSale(){
		this.setState({type: SalesPersonForm});
	}
	addEmployee(employee){
		console.log("Adding employee:", employee);
		$.ajax({
			type: 'POST', url: '/add', contentType:'application/json',
			data: JSON.stringify(employee),
			success: function (result) {
				alert("Success.");
				console.log("Added employee: ", result);
				window.location.replace('/');
			}.bind(this),
			error: (jqXHR, textStatus, errorThrown) => {
				alert("Error adding employee.");
				console.log("Error adding employee: ", errorThrown);
			}
		});
	}
}
