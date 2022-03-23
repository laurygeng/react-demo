import { combineReducers, createStore } from 'redux';

// 定义修改规则
export function countReducer(state = 0, action) {
	switch (action.type) {
		case 'ADD':
			return state + 1;
		case 'MINUS':
			return state - action.payload || 1;
		default:
			return state;
	}
}

function countReducer2(state = 0, action) {
	switch (action.type) {
		case 'ADD500':
			return state + 500;
		case 'MINUS500':
			return state - action.payload - 500 || 1;
		default:
			return state;
	}
}

const store = createStore(
	combineReducers({ count: countReducer, count2: countReducer2 })
);

export default store;
