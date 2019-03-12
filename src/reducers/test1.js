import initState from '../initState/index';
function test(state = initState.test1, action) {
	switch (action.type) {
	case 'hello':
		return state.name;
	default:
		return state;
	}
}

export default test;
