/*
    These actions are for storing items to cart.
*/

import {RESET_CART, ADD_ITEM_TO_CART, INITIALIZE_CART} from "./types";


export const initializeCart = restaurantId =>{
    return {
        type: INITIALIZE_CART,
        payload: restaurantId
    };
}

export const resetCart = () =>{
    return {
        type: RESET_CART,
    };
}



export const addItemToCart = (item) =>{
    return {
        type: ADD_ITEM_TO_CART,
        payload: item
    };
}

//todo: remove item, etc.