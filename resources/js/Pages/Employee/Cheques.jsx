import React from 'react';
import { Head } from '@inertiajs/react';

export default function Cheques({ cheques = [], message }) {
    // Ensure cheques is always an array
    const safeCheques = Array.isArray(cheques) ? cheques : []; // Check if it's an array, otherwise fallback to empty array.

    return (
        <div className="cheques-container">
            <Head title="Cheques Dashboard" />

            <div className="cheque-list">
                {safeCheques.length > 0 ? (
                    safeCheques.map((cheque) => (
                        <div key={cheque.id} className="cheque-card">
                            <p className="heads">
                                Cheque for{' '}
                                {cheque.products && cheque.products.length > 0
                                    ? cheque.products.map((product) => product.name).join(', ')
                                    : 'No products'}
                            </p>
                            <p className="bodys">Amount: Rs. {cheque.amount}</p>
                            <p className="bodys">Bank Name: {cheque.bank_name}</p>
                            <p className="bodys">Account Holder Name: {cheque.bearer_name}</p>
                            <p className="bodys">Account Number: {cheque.account_number}</p>
                            <p className="bodys">Collected Date: {cheque.collected_date}</p>
                            <p className="button">Status: {cheque.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No cheques submitted yet.</p>
                )}
            </div>
        </div>
    );
}
