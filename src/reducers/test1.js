import initState from '../initState/index';
import {HELLO_WORLD} from '../action/test';
function test(state = initState.test1, action) {
	switch (action.type) {
	case HELLO_WORLD:
		return Object.assign({...state, name: action.name});
	default:
		return state;
	}
}

export default test;
