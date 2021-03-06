import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ControlLabel, FormGroup} from 'react-bootstrap'
import FieldGroup from './FieldGroup.jsx';

export default class ProjectManagerForm extends React.Component{

	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(){
		console.log("Rendering ProjectManagerForm");
		return(
			<div>
					<FieldGroup id="formFirstName" type="text"
						name="firstName"
						label="* First Name"
						value={this.props.employee.firstName}/>
					<FieldGroup id="formLastName" type="text"
						name="lastName"
						label="* Last Name"
						value={this.props.employee.lastName}/>
					<FieldGroup id="formBirthDate" type="text"
						name="birthDate"
						label="* Birth Date"
						placeholder="YYYY-MM-DD"
						value={this.props.employee.birthDate}/>
					<FieldGroup id="formNumberOfEmployees" type="text"
						name="numberOfEmployees"
						label="Number Of Employees"
						value={this.props.employee.numberOfEmployees}/>
					<FieldGroup id="formSalary" type="text"
						name="salary"
						label="* Salary"
						value={this.props.employee.salary}/>
					<FieldGroup id="formBuilding" type="text"
						name="building"
						label="* Building"
						value={this.props.employee.building}/>
					<FieldGroup id="formFloor" type="text"
						name="floor"
						label="* Floor"
						value={this.props.employee.floor}/>
					<FieldGroup id="formOfficeNumber" type="text"
						name="officeNumber"
						label="* Office Number"
						value={this.props.employee.officeNumber}/>
					<Button className="pull-left" bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
			</div>
		);
	}

	validation(form){
		{/*To be completed...*/}
	}
	
	handleSubmit(e){
		e.preventDefault();
		var form = document.forms.EmployeeForm;
		this.props.submit(
			{
				type: form.employeeType.value,
				firstName: form.firstName.value,
				lastName: form.lastName.value,
				birthDate: form.birthDate.value,
				numberOfEmployees: form.numberOfEmployees.value,
				salary: form.salary.value,
				building: form.building.value,
				floor: form.floor.value,
				officeNumber: form.officeNumber.value
			}
		);
		{/*clear the form before the next input*/}
		form.employeeType.value="";
		form.firstName.value="";
		form.lastName.value="";
		form.birthDate.value="";
		form.numberOfEmployees.value="";
	  form.salary.value="";
		form.building.value="";
	  form.floor.value="";
	  form.officeNumber.value="";
	}
}
