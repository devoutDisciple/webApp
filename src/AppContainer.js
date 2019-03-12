import { connect } from 'react-redux';
import App from './App';
const mapStateToProps = state => {
	return {
		todos: state.test1
	};
};

const mapDispatchToProps = dispatch => {
	return {
		todoClick: age => {
			dispatch({
				type: 'hello',
				name: 'zhangzhen'
			});
		}
	};
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default VisibleTodoList;
