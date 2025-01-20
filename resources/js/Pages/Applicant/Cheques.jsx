import React from 'react';
import { Head } from '@inertiajs/react';

export default function Cheques({ cheques = [] }) {
    return (
        <div className="cheques-container">
            <Head title="Cheques Dashboard" />
            <h1>Your Cheques</h1>
            <div className="cheque-list">
                {cheques.length > 0 ? (
                    cheques.map((cheque) => (
                        <div key={cheque.id} className="cheque-card">
                            <h3>Cheque for {cheque.product.name}</h3>
                            <p>Amount: Rs. {cheque.amount}</p>
                            <p>Bank: {cheque.bank_details}</p>
                            <p>Collected Date: {cheque.collected_date}</p>
                            <p>Status: {cheque.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No cheques submitted yet.</p>
                )}
            </div>
        </div>
    );
}
