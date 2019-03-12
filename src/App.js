import React from 'react';
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';

class App extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Button type='primary' onClick={this.props.todoClick}>
					{this.props.todos.name}
				</Button>
			</div>
		);
	}
}

App.propTypes = {
	todos: PropTypes.object.isRequired,
	todoClick: PropTypes.object.isRequired
};

export default App;
