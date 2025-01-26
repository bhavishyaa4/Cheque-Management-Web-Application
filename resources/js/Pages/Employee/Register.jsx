import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register({ company_id, company_name }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_id: company_id || '',
        company_name: company_name || '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('employee.store'), {
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
            <Head title="Register Employee" />
            <div className="container mx-auto">
                <h2 className="text-3xl text-green-500 font-bold mb-6 text-center mt-6">{company_name || 'Unknown Company'} Employee Registration</h2>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" />
                        <input
                            ref={nameInputRef}
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="input-field"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <input
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

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="input-field"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {errorMessage && (
                        <p className="text-blue-500 text-center text-sm">{errorMessage}</p>
                    )}

                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Processing...' : 'Register'}
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">
                        <p className="info-text">
                            Already have an account?{' '}
                            <Link href={`/employee/login?company_id=${company_id}`} className="login-link">
                                Click to login!!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
