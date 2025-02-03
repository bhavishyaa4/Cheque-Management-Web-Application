import { Head, useForm, Link } from '@inertiajs/react';
import { useState,useEffect, useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import '../../../css/Applicant/applicantLogReg.css'

export default function Login({ company_id, company_name  }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        company_id: company_id || '', 
        company_name: company_name || '', 
    });

    const [errorMessage, setErrorMessage] = useState('');
    const emailInputRef = useRef(null);
    console.log('Data:', data);
    console.log('Errors:', errors);

    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('applicant.login'), {
            onError: (err) => {
                if (err.message) {
                    setErrorMessage(err.message);
                }
            },
            onFinish: () => {
                reset('password');
                setErrorMessage('');
            }
        });
    };

    return (
        <>
            <Head title="Login Applicant" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-green-500 font-bold mb-6 text-center mt-6">{company_name || 'Unknown Company'} Login</h2>

                <form onSubmit={submitHandler} className="space-y-6 form-container">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <input
                            ref={emailInputRef}
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className="rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 input-field"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" className="block" value="Password" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="password"
                            value={data.password}
                            className="rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 input-field"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center text-sm">{errorMessage}</p>
                    )}

                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Processing...' : 'Login'}
                        </PrimaryButton>
                    </div>

                    <div className="text-center mt-4">
                        <p className="info-text">
                            Don't have an account?{' '}
                            <Link href={`/applicant/register?company_id=${company_id}`} className="register-link">
                                Click to register!!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
