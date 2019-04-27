/*
    These are for when the user is looking at the Item form the menu and making selections.
*/

import {
  REMOVE_ORDER,
  INITIALIZE_ITEM,
  SET_ITEM_CHOICE,
  SET_ITEM_QUANTITY
} from "../actions/types";

const initialState = {
  itemId: "",
  itemName: "",
  quantity: 1,
  description: "",
  basePrice: 0.0,
  itemSections: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ORDER:
      return initialState;

    case SET_ITEM_CHOICE:
      const sectionIndex = action.sectionIndex;
      const choiceItem = action.payload;

      state.itemSections[sectionIndex] = choiceItem;

      return state;

    case SET_ITEM_QUANTITY:
      return { ...state, quantity: action.payload };

    case INITIALIZE_ITEM:
      return { ...state, ...action.payload }; //merge the two objs

    default:
      return state;
  }
};
