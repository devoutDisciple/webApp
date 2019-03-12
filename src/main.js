import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/index';

const loggerMiddleware = createLogger();

let store = createStore(reducers, applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
));
const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App/>
		</Provider>,
		document.getElementById('root')
	);
};
render();

