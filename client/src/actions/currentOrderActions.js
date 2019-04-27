/*
    These actions are for when the user is looking at the Item (form the menu) and making selections.
*/

import {
  INITIALIZE_ITEM,
  SET_ITEM_CHOICE,
  SET_ITEM_QUANTITY,
  REMOVE_ORDER
} from "./types";

export const initializeItem = item => {
  return {
    type: INITIALIZE_ITEM,
    payload: item
  };
};

export const setChoice = (choiceItem, index) => {
  return {
    type: SET_ITEM_CHOICE,
    payload: choiceItem,
    sectionIndex: index
  };
};

export const setQuantity = val => {
  return {
    type: SET_ITEM_QUANTITY,
    payload: val
  };
};

export const removeOrder = () => {
  return {
    type: REMOVE_ORDER
  };
};
