import React, { useState } from 'react'
import formatCurrency from './util';
import Fade from "react-reveal/Fade"
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

 const Cart = (props) => {
    const { cartItems } = props;
    const [state, setState] = useState({
        name: "",
        email: "",
        address: "",
        showCheckOut: false
    })

    const createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: state.name,
            email: state.email,
            address: state.address,
            cartItems: cartItems,
        }
        toast("Your Order is Placed!")

    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })

    }


    return (
        <>
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is Empty</div>
                    :
                    <div className="cart cart-header">You have {cartItems.length} in the cart</div>
                }
            </div>
            <div>
                <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    <div>
                                        <img src={item.image} alt={cartItems.title}></img>
                                    </div>
                                    <div>
                                        {/* {item.availableSizes[0]} */}
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">{formatCurrency(item.price)} x {item.count} {" "}</div>
                                        <button onClick={() => props.removeFromCart(props.cartItems,item)}>
                                            Remove
                                </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                    {formatCurrency(cartItems.reduce((a, b) => a + b.price * b.count, 0))}
                                </div>
                                <button className="primary button" onClick={() => setState({ showCheckOut: true })}>
                                    Proceed
                                </button>
                            </div>
                        </div>
                        {state.showCheckOut && (
                            <div className="cart">
                                <Fade right cascade>
                                    <form onSubmit={createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email</label>
                                                <input name="email" type="email" required onChange={handleChange}></input>
                                            </li>
                                            <li>
                                                <label>Name</label>
                                                <input name="name" type="text" required onChange={handleChange}></input>
                                            </li>
                                            <li>
                                                <label>Address</label>
                                                <input name="address" type="text" required onChange={handleChange}></input>
                                            </li>
                                            <li>
                                                <button className="button primary"   type="submit">Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                    <ToastContainer />
                                </Fade>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}


export default connect(state => ({
    cartItems:state.cart.cartItems
}),
{removeFromCart}
)(Cart);