import { combineReducers } from 'redux';
import test1 from './test1';
import test2 from './test2';


const store = combineReducers({
	test1,
	test2
});

export default store;
