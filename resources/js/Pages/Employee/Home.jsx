import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/employeeFirstPage.css';

export default function Home({ applicants = [], message}) {
    const {post} = useForm();
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [cheques, setCheques] = useState([]);
    const [loadingApplicantId, setLoadingApplicantId] = useState(null);
    const { get } = useForm();
    console.log('Data', applicants);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if(isConfirmed){
            post(route('logout'));
        }
    };

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
            <div className="dashboard-container">
                <div className="sidebar">
                    <div className="sidebar-header">Employee Dashboard</div>
                        <ul className='sidebar-menu'>
                            <li>
                                <Link href="/employee/dashboard"className='sidebar-link'>
                                    <FaUsers className='icon'/> View Users
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className='sidebar-link'>
                                    <FaUserEdit className='icon'/> Edit Profile 
                                </Link>
                            </li>
                        </ul>
                            <div className="logout-container">
                                <PrimaryButton onClick={handleLogout} className='logout-button'>
                                    <FaSignOutAlt className='icon'/> Logout
                                </PrimaryButton>
                            </div>
                    </div>
                    <div className="employee-dash">
                        <h1>Users</h1>
                        {applicants.length === 0 ? (
                            <p>No applicants available.</p>
                        ) : (
                            <div className="applicant-container">
                                {applicants.map((applicant) => (
                                    <div key={applicant.id} className="applicant-item">
                                        <strong>{applicant.name}</strong>
                                        <p><strong>Email:</strong> {applicant.email}</p>
                                        <PrimaryButton
                                            className="show-cheques-btn"
                                            onClick={() => showCheques(applicant.id)}
                                            disabled={loadingApplicantId === applicant.id}
                                        >
                                            {loadingApplicantId === applicant.id ? 'Opening...' : 'Show Cheques'}
                                        </PrimaryButton>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }   
