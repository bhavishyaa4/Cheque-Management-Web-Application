import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Home({ applicants = [], message }) {
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [cheques, setCheques] = useState([]);
    
    // Initialize the form using Inertia's useForm hook
    const { data, setData, get, processing, errors } = useForm({
        applicant_id: null, // For tracking the applicant whose cheques we want to fetch
    });

    const showCheques = (applicantId) => {
        setData('applicant_id', applicantId); // Set the applicant ID to the form data
        get(`/employee/applicant/${applicantId}/cheques`, {
            onSuccess: (page) => {
                if (page.props.cheques) {
                    setCheques(page.props.cheques); // Update cheques state with the received data
                    setSelectedApplicant(applicantId); // Update selected applicant
                }
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to load cheques');
            },
        });
    };

    return (
        <div className="home-container">
            <Head title="Employee Dashboard" />

            <div className="applicant-list">
                <h2>{message}</h2>
                <h3>Applicants</h3>
                {applicants.length === 0 ? (
                    <p>No applicants available.</p>
                ) : (
                    <ul>
                        {applicants.map((applicant) => (
                            <li key={applicant.id} className="applicant-item">
                                <div>
                                    <strong>{applicant.name}</strong>
                                    <p>Client Details: {applicant.email}</p>
                                    <PrimaryButton
                                        className="show-cheques-btn"
                                        onClick={() => showCheques(applicant.id)} // Trigger the function to show cheques
                                        disabled={processing} // Disable the button while the request is processing
                                    >
                                        {processing && selectedApplicant === applicant.id ? 'Loading...' : 'Show Cheques'}
                                    </PrimaryButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Display cheques of the selected applicant */}
            {selectedApplicant && cheques.length > 0 && (
                <div className="cheques-container">
                    <h3>Cheques for Applicant ID: {selectedApplicant}</h3>
                    <ul>
                        {cheques.map((cheque) => (
                            <li key={cheque.id} className="cheque-item">
                                <p><strong>Cheque Amount:</strong> Rs. {cheque.amount}</p>
                                <p><strong>Bank Name:</strong> {cheque.bank_name}</p>
                                <p><strong>Account Holder:</strong> {cheque.bearer_name}</p>
                                <p><strong>Status:</strong> {cheque.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display errors if any */}
            {errors && Object.keys(errors).length > 0 && (
                <div className="error-messages">
                    {Object.values(errors).map((error, index) => (
                        <p key={index} className="error">{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
