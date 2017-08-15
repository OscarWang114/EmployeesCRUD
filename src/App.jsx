import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';

ReactDOM.render(
	(
	<Router>
		<Switch>
			<Route exact path="/" component={EmployeeTable} />
			<Route path="/add" component={EmployeeAdd} />
			<Route path="/:id" component={EmployeeEdit} />
		</Switch>
	</Router>
	),
  document.getElementById('main')
);
