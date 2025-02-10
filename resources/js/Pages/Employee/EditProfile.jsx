import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/chequeEdit.css';
import InputError from '@/Components/InputError';

export default function EditProfile({ employee }) {
    const { data, setData, post, processing, errors } = useForm({
        // name: employee?.name || '', 
        name:employee.name,
    });
    console.log(employee);
    console.log(data);

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('employee.logout'));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employee.updateprofile') ,{
            onSuccess: () => {
                window.confirm('Profile Updated Successfully.');
            }
        });
    };

    const emailInputRef = React.useRef(null);
    useEffect(() =>{
        emailInputRef.current.focus();
    }, []);

    return (
            <div className="dashboard-container">
                <Head title = 'Employee Edit Profile'/>
                <div className="sidebar">
                        <Link href='/employee/firstDash' className='sidebar-header'>
                            Employee Dashboard
                        </Link>
                <ul className='sidebar-menu'>
                    <li>
                        <Link href='/employee/dashboard' className='sidebar-link'>
                            <FaUsers className='icon'/> View Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/employee/edit-profile" className='sidebar-link'>
                            <FaUserEdit className='icon'/> Edit Profile
                        </Link>
                    </li>
                </ul>
                <div className="logout-container">
                    <PrimaryButton onClick={handleLogout}className='logout-button'>
                        <FaSignOutAlt className='icon'/> Logout
                    </PrimaryButton>
                </div>
            </div>
                <div className="edit-cheque-container mx-auto animate-fadeIn">
                    <form onSubmit={handleSubmit} className='form-container'>
                        <div className="form-content">
                            <h2 className='form-title text-purple-500'>Edit Profile</h2>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        ref={emailInputRef}
                                        type="text"
                                        id="name"
                                        name="name"
                                        className='rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 form-control'
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name}/>
                                </div>
                        </div>
                        <div className="form-actions">
                            <PrimaryButton type="submit" className='save-button' disabled={processing}>
                                {processing ? 'Updating...' : 'Update Profile'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
    );
}
