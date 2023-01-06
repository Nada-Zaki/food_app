import React, { useReducer } from 'react'
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    let updatedTotalAmount, existingCartItemIndex, 
    existingCartItem, updatedItems, updatedItem;
    switch (action.type) {
        case 'ADD':
            updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            existingCartItemIndex = state.items.findIndex((item) => {
                return item.id === action.item.id 
            });

            existingCartItem = state.items[existingCartItemIndex];


            if (existingCartItem) {
                updatedItem = {
                    ...existingCartItem, 
                    amount: existingCartItem.amount + action.item.amount
                }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            else {
                updatedItems = state.items.concat(action.item);
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        case 'REMOVE':
            existingCartItemIndex = state.items.findIndex(item => item.id === action.id);           
            existingCartItem = state.items[existingCartItemIndex];
            updatedTotalAmount = state.totalAmount - existingCartItem.price;
            if (existingCartItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== existingCartItem.id)
            }
            else {
                updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        case 'CLEAR':
            return defaultCartState
            
            
        default:
            return defaultCartState;
    }    
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;
