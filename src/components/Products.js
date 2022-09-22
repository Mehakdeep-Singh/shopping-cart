import React, { useEffect, useState } from 'react'
import formatCurrency from './util'
 import Fade from "react-reveal/Fade"
 import Zoom from "react-reveal/Zoom"
import Modal from "react-modal"
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

function Products(props) {
    const [modalState, modalSetState] = useState(null)

    useEffect(() => {
        props.fetchProducts();
    },[])

    const openModal = (product) => {
        modalSetState(product);
    }

    const closeModal = () => {
        modalSetState(null);
    }


    const deleteProduct = async(id) => {
        await fetch(`http://localhost:4000/api/products/${id}`, { method: 'DELETE' });
        
        props.fetchProducts();
    }

    return (
        <div>
            <Fade bottom cascade>
                { 
                    !props.products ? (<div>...loading</div>)
                        : 
                        //  (<div>...loading</div>)
                        (<ul className="products">
                            {props.products.map(product =>
                                <li key={product._id}>
                                    <div className="product">
                                        <a href={"#" + product._id} onClick={() => openModal(product)}>
                                            <img src={product.image} alt={product.title} />
                                            <p>
                                                {product.title}
                                            </p>
                                        </a>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button onClick={() => props.addToCart(props.cartItems,product)} className="button primary">
                                                Add to cart
                                            </button>
                                            { props.adminView && <> <button onClick={() => deleteProduct(product._id)} className="button primary">
                                                delete
                                            </button>
                                            <button onClick={() => props.editProduct(product._id)} className="button primary">
                                                Edit Product
                                            </button></>}
                                           
                                        </div>
                                    </div>

                                </li>)}
                        </ul>
                )
                }
                 </Fade>
            {modalState && (
                <Modal isOpen={true} onRequestClose={closeModal}>
                    <Zoom>
                        <button onClick={closeModal} className="close-modal">X</button>
                        <div className="product-details">
                            <img src={modalState.image} alt={modalState.title}></img>
                            <div className="product-details-description">
                                <p>
                                    <strong>{modalState.title}</strong>
                                </p>
                                <p>
                                    {modalState.description}
                                </p>
                                <p>
                                    Available Sizes {" "}
                                    {modalState.availableSizes.map(x => (
                                        <span>
                                            {" "}
                                            <button className="button ">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>{formatCurrency(modalState.price)}</div>
                                    <button
                                        className="button primary"
                                        onClick={() => {
                                            props.addToCart(props.cartItems,modalState);
                                            closeModal();
                                        }}
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                            </div>
                        </div>

                    </Zoom>
                </Modal>
            )}

        </div>
    )
}
let testobj = connect((state) => { 
    return{products: state.products.filteredItems,
            cartItems:state.cart.cartItems
    }}
, {
    fetchProducts,
    addToCart
  }
  )(Products);
    

export default testobj