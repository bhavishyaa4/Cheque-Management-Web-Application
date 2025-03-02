import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/Employee/employeeLogReg.css';

export default function Login({ company_id, company_name }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        company_id: company_id || '',
        company_name: company_name || '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const emailInputRef = useRef(null);
    console.log('Data', data);
    console.log('Errors', errors);

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('employee.login'), {
            onError: (err) => {
                if (err.message) {
                    setErrorMessage(err.message);
                }
            },
            onFinish: () => {
                reset('password');
                setErrorMessage('');
            },
        });
    };

    return (
        <>
            <Head title="Employee Login" />
            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-blue-500 font-bold mb-6 text-center mt-6">{company_name || 'Unknown Company'} Employee Login</h2>

                <form onSubmit={submitHandler} className="space-y-6  form-container">
                    <div>
                        <InputLabel htmlFor="email" className='block' value="Email" />
                        <input
                            ref={emailInputRef}
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="rounded-md border-blue-300 shadow-sm focus:borderblue-500 focus:ring-blue-500 input-field"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="rounded-md border-blue-300 shadow-sm focus:borderblue-500 focus:ring-blue-500 input-field"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
                    )}

                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Logging in...' : 'Login'}
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">
                        <p className="info-text">
                            Don't have an account?{' '}
                            <Link href={`/employee/register?company_id=${company_id}`} className="login-link">
                                Register Now!!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
