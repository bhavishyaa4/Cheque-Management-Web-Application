import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Home({ applicants = [], message }) {
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [cheques, setCheques] = useState([]);
    const [loadingApplicantId, setLoadingApplicantId] = useState(null);
    const { get } = useForm();

    const showCheques = (applicantId) => {
        setLoadingApplicantId(applicantId);

        get(`/employee/applicant/${applicantId}/cheques`, {
            onSuccess: (page) => {
                if (page.props.cheques) {
                    setCheques(page.props.cheques);
                    setSelectedApplicant(applicantId);
                }
            },
            onError: () => alert('Failed to load cheques'),
            onFinish: () => setLoadingApplicantId(null),
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
                                        onClick={() => showCheques(applicant.id)} 
                                        disabled={loadingApplicantId === applicant.id}>
                                        {loadingApplicantId === applicant.id ? 'Opening...' : 'Show Cheques'}
                                    </PrimaryButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
