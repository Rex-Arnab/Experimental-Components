// store.js
import { createStore } from 'redux';

const initialState = {};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Define your reducer logic here
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;