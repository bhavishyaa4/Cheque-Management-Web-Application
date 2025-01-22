import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/productSideBar.css';
import '../../../css/Product/productEdit.css';

export default function BuyProduct({ products, amount }) {
    const { data, setData, post, errors, processing } = useForm({
        amount: amount   || "",
        bank_name: '',
        bearer_name: '',
        account_number: '',
        collected_date: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

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
            <h1>Buy Product</h1>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={data.amount}
                            onChange={handleInputChange}
                            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
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
                            className={`form-control ${errors.bank_name ? "is-invalid" : ""}`}
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
                            className={`form-control ${errors.bearer_name ? "is-invalid" : ""}`}
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
                            className={`form-control ${errors.account_number ? "is-invalid" : ""}`}
                            placeholder="Enter Account Number"
                        />
                        {errors.account_number && <div className="error">{errors.account_number}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="collected_date">Date of Collection</label>
                        <input
                            type="date"
                            id="collected_date"
                            name="collected_date"
                            value={data.collected_date}
                            onChange={handleInputChange}
                            className={`form-control ${errors.collected_date ? "is-invalid" : ""}`}
                        />
                        {errors.collected_date && <div className="error">{errors.collected_date}</div>}
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
    );
}
