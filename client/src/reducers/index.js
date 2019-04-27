import {combineReducers} from 'redux';
import currentCartOrderReducer from './currentOrderReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    currentOrder: currentCartOrderReducer,
    cart: cartReducer
})
