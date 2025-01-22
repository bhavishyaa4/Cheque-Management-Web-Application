import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import "../../../css/Applicant/authDash.css";
import "../../../css/Applicant/applicantSideBar.css";

export default function SpecificHome({ company }) {
    const { post } = useForm();
    const [companyDetails] = useState(company);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [cart, setCart] = useState([]);
    const [isCartVisible, setCartVisible] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            post(route("applicant.logout"));
        }
    };

    const handleQuantityChange = (productId, stock, price, value) => {
        const quantity = Math.min(Math.max(0, value), stock);
        setSelectedQuantities((prev) => ({
            ...prev,
            [productId]: {
                quantity,
                amount: quantity * price,
            },
        }));
    };

    const addToCart = (product) => {
        if (!selectedQuantities[product.id]?.quantity) return;
    
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity +
                                  selectedQuantities[product.id].quantity,
                              amount:
                                  item.amount +
                                  selectedQuantities[product.id].amount,
                          }
                        : item
                )
            );
        } else {
            setCart((prev) => [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    quantity: selectedQuantities[product.id].quantity,
                    amount: selectedQuantities[product.id].amount,
                },
            ]);
        }
    
        setCartVisible(true);
    };

    const removeCartItem = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
        if (cart.length === 1) {
            setCartVisible(false); 
        }
    };

    const toggleCart = () => {
        setCartVisible((prev) => !prev);
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => total + item.amount, 0);
    };

    return (
        <div className="specific-home-container">
            <Head title="Company Dashboard" />
            <div className="sidebar">
                <div className="sidebar-header">
                    {companyDetails.name}
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/authdash" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaPhoneAlt className="icon" /> Contact
                        </a>
                    </li>
                </ul>
                <div className="cart-container">
                    <button onClick={toggleCart} className="cart-button">
                        <FaShoppingCart /> View Cart
                    </button>
                </div>
                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div className="product-container">
                <h1>Welcome to {companyDetails.name} Product Page</h1>
                <div className="products">
                    {companyDetails.products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: Rs. {product.price}</p>
                            <p>Available Stock: {product.stock}</p>
                            {product.image && (
                                <img
                                    src={`/uploads/products/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}
                            <div className="quantity-selector">
                                <label htmlFor={`quantity-${product.id}`}>
                                    Select Quantity:
                                </label>
                                <input
                                    type="number"
                                    id={`quantity-${product.id}`}
                                    value={selectedQuantities[product.id]?.quantity || 0}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            product.id,
                                            product.stock,
                                            product.price,
                                            parseInt(e.target.value, 10) || 0
                                        )
                                    }
                                    min="0"
                                    max={product.stock}
                                />
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`cart-sidebar ${isCartVisible ? "visible" : ""}`}>
                <h2 className="cart-header">Your Cart</h2>
                <button
                    className="close-cart-button"
                    onClick={() => setCartVisible(false)}
                >
                    ×
                </button>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <div className="cart-item">
                                    <img
                                        src={`/uploads/products/${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <span>
                                            {item.quantity} pcs (Total: Rs.{" "}
                                            {item.amount})
                                        </span>
                                        <button
                                            className="remove-button"
                                            onClick={() => removeCartItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty</p>
                )}
                <div className="cart-total">
                    <h3 className="amount-total">Total: Rs <em>{getTotalAmount()}</em></h3>
                    <Link href={route('applicant.buyProduct', {
                            product_ids: cart.map(item => item.id).join(','),
                            amount: getTotalAmount(),
                        })} className="checkout-button">Go to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
