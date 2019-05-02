/*
    These are for storing items to cart.
*/

import {
  RESET_CART,
  ADD_ITEM_TO_CART,
  INITIALIZE_CART
} from "../actions/types";

const initialState = {
  restaurantId: "",
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_CART:
      return initialState;

    case INITIALIZE_CART:
      //only init cart if there are no items in it from another restaurant
      if (state.items.length == 0) {
        //set items to be empty, and id.
        return {
          restaurantId: action.payload,
          items: []
        };
      }

      return state; // don't change state (it has items inside it)

    case ADD_ITEM_TO_CART:
      const item = action.payload;

      item.itemSections;

      //remove any null sections (the sections that user didn't pick anything for)
      const sections = item.itemSections.filter(el => {
        return el != null;
      });

      item.itemSections = sections;

      state.items.push(item); // add item to cart

      return state;

    //add cases: remove item from cart

    default:
      return state;
  }
};
