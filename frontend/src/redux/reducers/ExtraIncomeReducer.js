import {
  EXTRAINCOME_DETAIL_CREATE_FAILURE,
  EXTRAINCOME_DETAIL_CREATE_REQUEST,
  EXTRAINCOME_DETAIL_CREATE_SUCCESS,
  EXTRAINCOME_DETAIL_DELETE_FAILURE,
  EXTRAINCOME_DETAIL_DELETE_REQUEST,
  EXTRAINCOME_DETAIL_DELETE_SUCCESS,
  EXTRAINCOME_DETAIL_LIST_FAILURE,
  EXTRAINCOME_DETAIL_LIST_REQUEST,
  EXTRAINCOME_DETAIL_LIST_SUCCESS,
  EXTRAINCOME_DETAIL_UPDATE_FAILURE,
  EXTRAINCOME_DETAIL_UPDATE_REQUEST,
  EXTRAINCOME_DETAIL_UPDATE_SUCCESS,
} from "../constants/ExtraIncomeConstants";

// Extra Income Create Reducer
export const ExtraIncomeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRAINCOME_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXTRAINCOME_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        extraIncomeDatas: action.payload,
      };
    case EXTRAINCOME_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Extra Income List Reducer
export const ExtraIncomeListReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRAINCOME_DETAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case EXTRAINCOME_DETAIL_LIST_SUCCESS:
      return {
        loading: false,
        extraIncomeLists: action.payload,
      };
    case EXTRAINCOME_DETAIL_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Extra Income Update Reducer
export const ExtraIncomeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRAINCOME_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXTRAINCOME_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        extraIncomeUpdated: action.payload,
      };
    case EXTRAINCOME_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Extra Income Delete Reducer
export const ExtraIncomeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRAINCOME_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXTRAINCOME_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        extraIncomeDeleted: action.payload,
      };
    case EXTRAINCOME_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
