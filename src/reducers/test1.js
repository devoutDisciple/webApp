import initState from '../initState/index';
function test(state = initState.test1, action) {
	console.log(action);
	switch (action.type) {
	case 'hello':
		return Object.assign({...state, name: action.name});
	default:
		return state;
	}
}

export default test;
