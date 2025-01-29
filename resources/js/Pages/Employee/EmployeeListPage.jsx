import React from "react";
import { Head } from "@inertiajs/react";

export default function EmployeeListPage({ company_id, company_name, employees }) {
    return (
        <>
            <Head title="Employee List" />
            <div className="employee-page">
                <h1>{company_name} Employees</h1>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="2">No employees found</td>
                            </tr>
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
