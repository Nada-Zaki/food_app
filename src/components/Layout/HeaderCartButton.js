import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const btnClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=> {
        return curNumber + item.amount;
    }, 0);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;
