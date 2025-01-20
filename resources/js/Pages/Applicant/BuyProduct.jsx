import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/productSideBar.css';
import '../../../css/Product/productEdit.css';

export default function BuyProduct({ product }) {
    const { data, setData, post, errors, processing } = useForm({
        amount: '',
        bank_details: '',
        collected_date: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error message

        post(route('applicant.submitCheque', product.id), {
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
            <Head title={`Buy ${product.name}`} />
            <h1>Buy {product.name}</h1>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-content">
                    {/* Amount Field */}
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
                            required
                        />
                        {errors.amount && <div className="error">{errors.amount}</div>}
                    </div>

                    {/* Bank Details Field */}
                    <div className="form-group">
                        <label htmlFor="bank_details">Bank Details</label>
                        <input
                            type="text"
                            id="bank_details"
                            name="bank_details"
                            value={data.bank_details}
                            onChange={handleInputChange}
                            className={`form-control ${errors.bank_details ? "is-invalid" : ""}`}
                            placeholder="Enter bank details"
                            required
                        />
                        {errors.bank_details && <div className="error">{errors.bank_details}</div>}
                    </div>

                    {/* Collected Date Field */}
                    <div className="form-group">
                        <label htmlFor="collected_date">Date of Collection</label>
                        <input
                            type="date"
                            id="collected_date"
                            name="collected_date"
                            value={data.collected_date}
                            onChange={handleInputChange}
                            className={`form-control ${errors.collected_date ? "is-invalid" : ""}`}
                            required
                        />
                        {errors.collected_date && <div className="error">{errors.collected_date}</div>}
                    </div>
                </div>

                {/* Display error message */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Submit Button */}
                <div className="create-actions">
                    <PrimaryButton type="submit" className="create-button" disabled={processing}>
                        {processing ? 'Submitting...' : 'Submit Cheque'}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
