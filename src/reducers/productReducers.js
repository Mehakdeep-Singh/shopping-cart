// import { act } from "react-dom/test-utils";

const { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } = require("../types");

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                filteredItems: action.payload.items,
                size: action.payload.size
            };
        case ORDER_PRODUCTS_BY_PRICE:
            return{
                ...state,
                sort:action.payload.sort,
                filteredItems: action.payload.items
            }   
        case FETCH_PRODUCTS:
            return { items: action.payload , filteredItems:action.payload}
        default:
            return state;
    }
}