import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Home = ({ applicants }) => {
    const [applicantList, setApplicantList] = useState(applicants);

    const showCheques = (applicantId) => {
        // Fetch cheques for the selected applicant
        Inertia.get(`/employee/applicant/${applicantId}/cheques`)
            .then(response => {
                alert('Cheque details loaded');
                // Optionally, you can display cheques here if you want to update the UI
            })
            .catch(error => {
                alert('Error loading cheques');
            });
    };

    return (
        <div className="employee-dashboard">
            <h1>Welcome to your Dashboard</h1>
            
            <div className="applicant-list">
                <h2>Applicants</h2>
                {applicantList.length === 0 ? (
                    <p>No applicants available.</p>
                ) : (
                    <ul>
                        {applicantList.map(applicant => (
                            <li key={applicant.id}>
                                <div>
                                    <strong>{applicant.name}</strong>
                                    <p>Client Details: {applicant.client_details}</p>
                                    <button 
                                        onClick={() => showCheques(applicant.id)} 
                                        className="show-cheques-btn">
                                        Show Cheques
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
