import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItem: [],
    totalPrice: 0,
    cart: null
}
export const groceryslice = createSlice({
    name: "groceryProduct",
    initialState,
    reducers: {
        addCart: (state, action) => {
            const { items, totalPrice } = action.payload;
            state.cartItem = items || [];
            state.totalPrice = totalPrice
            state.cart = { ...action.payload }
        },
        editCart: (state, action) => {
            const updatedItem = Array.isArray(action.payload.items) ? action.payload.items : [action.payload.items]
            updatedItem.forEach((update) => {
                const existIndex = state.cartItem.findIndex((item) => item._id === update._id)
                if (existIndex !== -1) {
                    state.cartItem[existIndex] = update
                }
                else {
                    state.cartItem.push(update)
                }
            })
            state.totalPrice = state.cartItem.reduce(
                (total, item) => total + item.product.pricePerKg * item.quantity,
                0
            );
        },
        deleteCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item._id !== action.payload)
            state.totalPrice = state.cartItem.reduce(
                (total, item) => total + item.product.pricePerKg * item.quantity,
                0
            );
        }
    }
})
export const { addCart, editCart, deleteCart } = groceryslice.actions
export default groceryslice.reducer