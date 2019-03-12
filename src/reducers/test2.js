import initState from '../initState/index';
function test(state = initState.test2, action) {
	switch (action.type) {
	case 'world':
		return state.name;
	default:
		return state;
	}
}

export default test;
