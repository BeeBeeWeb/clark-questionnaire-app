import { combineReducers } from 'redux';
import savedResponseReducer from './saved-response/saved-response.reducer';


const rootReducer =  combineReducers({
    data: savedResponseReducer
});

export default rootReducer;

