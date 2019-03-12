import { connect } from 'react-redux';
import App from './App';
import {selectSubreddit} from './action/test';
const mapStateToProps = state => {
	return {
		todos: state.test1
	};
};

const mapDispatchToProps = dispatch => {
	return {
		todoClick: () => {
			dispatch(selectSubreddit(Math.random() > 0.5 ? 'zhangzhen' : 'wangzi'));
		}
	};
};

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default VisibleTodoList;
