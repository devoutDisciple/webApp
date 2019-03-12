import React from 'react';
import { Button } from 'antd-mobile';

export default class App extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div><Button type='primary'>{this.props.todos.name}</Button></div>
		);
	}
}
