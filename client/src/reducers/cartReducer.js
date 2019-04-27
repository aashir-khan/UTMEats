/*
    These are for storing items to cart.
*/

import {RESET_CART, ADD_ITEM_TO_CART, INITIALIZE_CART} from "../actions/types";

const initialState = {
    restaurantId : "",
    items: []
}

export default (state = initialState , action) => {

    switch (action.type) {

        case RESET_CART:
            return initialState;
        
        case INITIALIZE_CART:

            //set items to be empty, and id.
            return {
                restaurantId :action.payload,
                items: []
            };
        

        case ADD_ITEM_TO_CART:

            const item = action.payload;

            state.items.push(item); // add item to cart

            return state;

        //add cases: remove item from cart
    
        default:
            return state;
    }

}