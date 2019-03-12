import { connect } from 'react-redux';
import App from './App';
const mapStateToProps = state => {
	return {
		todos: state.test1
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: age => {
			dispatch({
				type: 'hello',
				age: age
			});
		}
	};
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default VisibleTodoList;