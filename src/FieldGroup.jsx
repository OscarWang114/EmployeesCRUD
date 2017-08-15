import React from 'react';
import ReactDOM from 'react-dom';
import {ControlLabel} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

export default class FieldGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {value: this.props.value};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}
	render(){
		console.log("Rendering FormGroup of ",this.props.value);
		return(
		<FormGroup controlId={this.props.id}>
			<ControlLabel>{this.props.label}</ControlLabel>
			<FormControl
				type={this.props.type}
				name={this.props.name}
				placeholder={this.props.placeholder}
				value={this.state.value}
				onChange={this.handleChange}/>
		</FormGroup>
		);
	}
}
