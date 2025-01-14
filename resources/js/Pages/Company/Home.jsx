import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/companyLogReg.css';

export default function Dashboard({ company_name }) {
    const { post } = useForm();
    const [logoutMessage, setLogoutMessage] = useState("");

    const handleLogout = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to log out?");

        if (isConfirmed) {
            post(route('logout'), {
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
        <div className="flex min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-8">Dashboard</h2>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white">Profile</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white">Reports</a>
                        </li>
                    </ul>
                </div>

                <div className="mt-auto">
                    <PrimaryButton onClick={handleLogout} className="w-full mb-4">
                        Logout
                    </PrimaryButton>
                </div>
            </div>

            <div className="flex-1 p-6">
                <Head title="Company Dashboard" />
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">
                    {company_name}
                </h1>
                {logoutMessage && (
                    <div className="text-lg font-semibold text-green-500 mb-4">
                        {logoutMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
