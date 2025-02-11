import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FaBox, FaInfoCircle, FaPhoneAlt, FaUserTie, FaSignOutAlt, FaTrash, FaDraftingCompass } from "react-icons/fa";
import '../../../css/companyDashboard.css';
import '../../../css/Employee/employeeList.css';

export default function EmployeeListPage({ company_id, company_name, employees }) {
    const { post, delete: deleteRequest } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (isConfirmed) {
            post(route('employee.logout'));
        }
    };

    const handleDelete = (employeeId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
        if (isConfirmed) {
            deleteRequest(route('company.employee.delete', { company_id: company_id, employeeId: employeeId }), {
                onSuccess: () => {
                    alert('Employee deleted successfully');
                },
                onError: () => {
                    alert('Failed to delete employee');
                }
            });
        }
    };

    return (
        <>
            <Head title="Employee List" />
            <div className="dashboard-container">
                <div className="sidebar">
                    <Link href="/company/home" className="sidebar-header">Dashboard</Link>
                    <ul className="sidebar-menu">
                        <li>
                            <Link href="/company/products" className="sidebar-link">
                                <FaBox className="icon" /> Products
                            </Link>
                        </li>
                        <li>
                            <Link href={`/company/employees?company_id=${company_id}`} className="sidebar-link">
                                <FaUserTie className="icon" /> Employee
                            </Link>
                        </li>
                        <li>
                            <Link href="/company/about" className="sidebar-link">
                                <FaInfoCircle className="icon" /> About
                            </Link>
                        </li>
                        <li>
                                <Link href="/company/trackers" className='sidebar-link'>
                                    <FaDraftingCompass className='icon'/> Tracker 
                                </Link>
                            </li>
                        <li>
                            <Link href="/company/contactus" className="sidebar-link">
                                <FaPhoneAlt className="icon" /> Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="logout-container">
                        <PrimaryButton onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" /> Logout
                        </PrimaryButton>
                    </div>
                </div>
                <div className="employee-list-content">
                    <h1>{company_name} Employees</h1>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No employees found</td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>
                                            <button 
                                                className="delete-button" 
                                                onClick={() => handleDelete(employee.id)}
                                            >
                                                <FaTrash className="icon" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
