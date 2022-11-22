import {
  GROCERY_DETAIL_CREATE_FAILURE,
  GROCERY_DETAIL_CREATE_REQUEST,
  GROCERY_DETAIL_CREATE_SUCCESS,
  GROCERY_DETAIL_DELETE_FAILURE,
  GROCERY_DETAIL_DELETE_REQUEST,
  GROCERY_DETAIL_DELETE_SUCCESS,
  GROCERY_DETAIL_IMPORT_FAILURE,
  GROCERY_DETAIL_IMPORT_REQUEST,
  GROCERY_DETAIL_IMPORT_SUCCESS,
  GROCERY_DETAIL_LIST_FAILURE,
  GROCERY_DETAIL_LIST_REQUEST,
  GROCERY_DETAIL_LIST_SUCCESS,
  GROCERY_DETAIL_UPDATE_FAILURE,
  GROCERY_DETAIL_UPDATE_REQUEST,
  GROCERY_DETAIL_UPDATE_SUCCESS,
} from "../constants/GroceryConstants";

// Grocery Create Reducer
export const GroceryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        groceryDatas: action.payload,
      };
    case GROCERY_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Grocery Import Reducer
export const GroceryImportReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_DETAIL_IMPORT_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_DETAIL_IMPORT_SUCCESS:
      return {
        loading: false,
        groceryImportDatas: action.payload,
      };
    case GROCERY_DETAIL_IMPORT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Grocery List Reducer
export const GroceryListReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_DETAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case GROCERY_DETAIL_LIST_SUCCESS:
      return {
        loading: false,
        groceryLists: action.payload,
      };
    case GROCERY_DETAIL_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Grocery Update Reducer
export const GroceryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GROCERY_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        groceryUpdated: action.payload,
      };
    case GROCERY_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Grocery Delete Reducer
export const GroceryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROCERY_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case GROCERY_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        groceryDeleted: action.payload,
      };
    case GROCERY_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
