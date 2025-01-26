import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ company_id, company_name }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        company_id: company_id || '',
        company_name: company_name || '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const emailInputRef = useRef(null);

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
                reset();
                setErrorMessage('');
            },
        });
    };

    return (
        <>
            <Head title="Employee Login" />
            <div className="container mx-auto">
                <h2 className="text-3xl text-green-500 font-bold mb-6 text-center mt-6">{company_name || 'Unknown Company'} Employee Login</h2>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <input
                            ref={emailInputRef}
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="input-field"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="input-field"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {errorMessage && (
                        <p className="text-blue-500 text-center text-sm">{errorMessage}</p>
                    )}

                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Processing...' : 'Login'}
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
