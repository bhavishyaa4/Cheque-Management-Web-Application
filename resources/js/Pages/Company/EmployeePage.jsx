 import React from "react";
 import {Head, Link, useForm} from "@inertiajs/react";
import { FaBox, FaInfoCircle, FaPhoneAlt, FaUserTie, FaSignOutAlt, FaUserPlus, FaEye, FaDraftingCompass } from "react-icons/fa";
import PrimaryButton from "@/Components/PrimaryButton";
import '../../../css/companyDashboard.css';
import '../../../css/Employee/employeeHome.css';

 export default function EmployeePage({company_id, company_name}){

    console.log('Company Id:',company_id);
    console.log('Company Name:', company_name);
    const { post } = useForm();
    const handleLogout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            post(route('company.logout'), {
                onSuccess: (response) => {
                    console.log('Logout Response:', response);
                    setLogoutMessage(response.message || "You have logged out successfully!");
                },
                onError: (error) => {
                    console.error('Logout Failed:', error);
                    setLogoutMessage("Logout failed. Please try again.");
                }
            });
        }
    };

    return (
        <>
        <Head title="Employee Dashboard" />
            <div className="dashboard-container">
                <div className="sidebar">
                    <Link href="/company/home" className="sidebar-header">Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/company/products" className="sidebar-link">
                            <FaBox className="icon"/> Products
                            </Link>
                        </li>
                        <li>
                            <Link href={`/company/employees?company_id=${company_id}`} className="sidebar-link">
                            <FaUserTie className="icon"/> Employee
                            </Link>
                        </li>
                        <li>
                            <Link href="/company/about" className="sidebar-link">
                            <FaInfoCircle className="icon"/> About
                            </Link>
                        </li>
                        <li>
                            <a href="/company/trackers" className="sidebar-link">
                                <FaDraftingCompass className="icon" /> Tracker
                            </a>
                        </li>                        
                        <li>
                            <Link href="/company/contactus" className="sidebar-link">
                            <FaPhoneAlt className="icon"/> Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                    </div>
                </div>

                <div className="employee-content">
                   <h1>Employee Control</h1>
                   <div className="employee-options">
                   <Link href={`/employee/login?company_id=${company_id}`} className="option-button">
                            <PrimaryButton className="hello">
                                <FaUserPlus className="icon" /> Add Employee 
                            </PrimaryButton>
                        </Link>
                        <Link href={`/company/employees/${company_id}`} className="option-button">
                            <PrimaryButton className="hello">
                                <FaEye className="icon" /> View Employee
                            </PrimaryButton>
                        </Link>
                   </div>
                </div>
            </div>
        </>
    )

 }