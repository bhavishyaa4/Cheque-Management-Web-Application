import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ name }) {
    const { post } = useForm();
    const [logoutMessage, setLogoutMessage] = useState("");

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
            <Head title="Company Dashboard" />
            <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen text-white">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen text-white">
                    <h1 className="text-4xl font-bold text-gray-800 mb-5 ml-2">
                        Welcome to Your Company Dashboard, {name}
                    </h1>
                    {logoutMessage && (
                        <div className="text-lg font-semibold text-green-500">
                            {logoutMessage}
                        </div>
                    )}
                    <PrimaryButton onClick={handleLogout} className="submit-button">
                        Logout
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
}
