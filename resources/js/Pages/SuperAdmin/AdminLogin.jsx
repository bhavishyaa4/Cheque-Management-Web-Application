import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import '../../../css/SuperAdmin/adminLogReg.css';

const AdminLogin = () => {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    console.log('Data:',data);
    console.log('Errors', errors);

    const emailInputRef = useRef(null);
    useEffect(() => {
        emailInputRef.current.focus();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.login'),{
            onError: (err) => {
                if(err.errorMessage) {
                    setErrorMessage(err.errorMessage);
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
            <Head title="Login Admin" />
            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-orange-500 font-bold mb-6 text-center mt-6">Admin Login</h2>
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
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
                            onChange={(e) => setData('email', e.target.value)}
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
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
                            onChange={(e) => setData('password', e.target.value)}
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
                            <a href="/superadmin/register" className="register-link">
                                Register here!!
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
};
export default AdminLogin;