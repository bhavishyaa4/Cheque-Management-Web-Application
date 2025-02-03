import React, {useEffect, useRef} from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { FaSignOutAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
import '../../../css/companyDashboard.css';
import '../../../css/Employee/chequeEdit.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditCheque({ cheque }) {
    const { data, post, setData, put, processing, errors } = useForm({
        amount: cheque.amount,
        status: cheque.status,
        collected_date: cheque.collected_date,
    });

    const handleLogout = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if(isConfirmed){
            post(route('logout'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/employee/cheques/update/${cheque.id}`,{
            onSuccess: () => {
                window.confirm('Updated Sucessfully.');
            }
        });
    };

    const amountInputRef = useRef(null);
    useEffect(() => {
        amountInputRef.current.focus();
    }, []);

    console.log('Cheque Data:', data);
    console.log('Errors:', errors);
    console.log('post:', cheque);

    return (
        <div className="dashboard-container">
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
                <Head title="Edit Cheque" />
                <form onSubmit={handleSubmit} className='form-container'>
                    <h2 className='form-title text-purple-500'>Edit Cheque</h2>
                        <div className="form-content">
                            <div className='form-group'>
                                <label htmlFor='amount'>Amount</label>
                                <input
                                    ref={amountInputRef}
                                    type="number"
                                    id='number'
                                    className='rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 form-control'
                                    name="amount"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                />
                                {errors.amount && <div className="error">{errors.amount}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='status'>Status</label>
                                <select
                                    className='rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 form-control'
                                    name="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="hold">Hold</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="ok">Completed</option>
                                </select>
                                {errors.status && <div className="error">{errors.status}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='collecteDate'>Collected Date</label>
                                <input
                                    type="date"
                                    name="collected_date"
                                    className='rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 form-control'
                                    value={data.collected_date}
                                    onChange={(e) => setData('collected_date', e.target.value)}
                                />
                                {errors.collected_date && <div className="error">{errors.collected_date}</div>}
                            </div>
                        </div>
                            <div className="form-actions">
                                <PrimaryButton type="submit" className='save-button' disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Cheque'}

                                </PrimaryButton>
                            </div>
                    </form>
             </div>
         </div>
    );
}
