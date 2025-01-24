import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaBox, FaInfoCircle, FaPhoneAlt, FaSignOutAlt } from 'react-icons/fa';
import "../../../css/Applicant/applicantSideBar.css";
import "../../../css/Applicant/buyProduct.css";

export default function BuyProduct({ products, amount }) {
    const { data, setData, post, errors, processing } = useForm({
        amount: amount || "",
        bank_name: '',
        bearer_name: '',
        account_number: '',
        collected_date: '',
        location: '',
        number: '',
        product_ids: []
    });

    const [errorMessage, setErrorMessage] = useState('');
    const amountInputRef = useRef(null);

    useEffect(() => {
        amountInputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleProductSelection = (e) => {
        // const { value, checked } = e.target;
        // setData('product_ids', checked ? [...data.product_ids, value] : data.product_ids.filter(id => id !== value));
        const { value, checked } = e.target;
        const selectedProduct = products.find((product) => product.id === parseInt(value));
    
        if (checked) {
            setData('product_ids', [...data.product_ids, value]);
            setData('amount', parseFloat(data.amount) + parseFloat(selectedProduct.price));
        } else {
            setData('product_ids', data.product_ids.filter((id) => id !== value));
            setData('amount', parseFloat(data.amount) - parseFloat(selectedProduct.price));
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to log out?")) {
            post(route("applicant.logout"));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (data.product_ids.length === 0) {
            setErrorMessage('You must select at least one product.');
            return;
        }

        post(route('applicant.submitCheque', products[0].id), {
            onError: (err) => {
                if (err.message) {
                    setErrorMessage(err.message);
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');
                }
            },
            onFinish: () => {
                setErrorMessage('');
            },
            onSuccess: () => {
                alert('Cheque submitted successfully!');
            }
        });
    };

    return (
        <div className="buy-product-container">
            <Head title="Buy Product" />
            <div className="sidebar">
                <div className="sidebar-header">Dashboard</div>
                <ul className="sidebar-menu">
                    <li>
                        <Link href="/applicant/authdash" className="sidebar-link">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <a href="/applicant/about" className="sidebar-link">
                            <FaInfoCircle className="icon" /> About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaPhoneAlt className="icon" /> Contact
                        </a>
                    </li>
                </ul>
                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>
            <div className="container mx-auto animate-fadeIn">
                <h1 className="pays">Payment Process</h1>
                <form onSubmit={handleSubmit} className="space-y-6 form-container">
                    <div className="form-content">
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                                ref={amountInputRef}
                                type="number"
                                id="amount"
                                name="amount"
                                value={data.amount}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.amount ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter amount"
                                readOnly
                            />
                            {errors.amount && <div className="error">{errors.amount}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="bank_name">Bank Name</label>
                            <input
                                type="text"
                                id="bank_name"
                                name="bank_name"
                                value={data.bank_name}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.bank_name ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter Bank Name"
                            />
                            {errors.bank_name && <div className="error">{errors.bank_name}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="bearer_name">Account Holder Name</label>
                            <input
                                type="text"
                                id="bearer_name"
                                name="bearer_name"
                                value={data.bearer_name}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.bearer_name ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter Account Holder Name"
                            />
                            {errors.bearer_name && <div className="error">{errors.bearer_name}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="account_number">Account Number</label>
                            <input
                                type="text"
                                id="account_number"
                                name="account_number"
                                value={data.account_number}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.account_number ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter Account Number"
                            />
                            {errors.account_number && <div className="error">{errors.account_number}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={data.location}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.location ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter Your Location"
                            />
                            {errors.location && <div className="error">{errors.location}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                value={data.number}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.number ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                                placeholder="Enter Your Phone Number"
                            />
                            {errors.number && <div className="error">{errors.number}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="collected_date">Date of Collection</label>
                            <input
                                type="date"
                                id="collected_date"
                                name="collected_date"
                                value={data.collected_date}
                                onChange={handleInputChange}
                                className={`form-control rounded-md border ${errors.collected_date ? "border-red-500" : "border-green-300"} shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.collected_date && <div className="error">{errors.collected_date}</div>}
                        </div>

                        <div className="form-group">
                            <label>Select Products</label>
                            {products.map((product) => (
                                <div key={product.id}>
                                    <input
                                        type="checkbox"
                                        id={`product-${product.id}`}
                                        value={product.id}
                                        onChange={handleProductSelection}
                                    />
                                    <label htmlFor={`product-${product.id}`}>{product.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <div className="create-actions">
                        <PrimaryButton type="submit" className="create-button" disabled={processing}>
                            {processing ? 'Submitting...' : 'Submit Cheque'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
