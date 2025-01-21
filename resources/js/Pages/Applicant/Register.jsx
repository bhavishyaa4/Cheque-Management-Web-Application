import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import '../../../css/Applicant/applicantLogReg.css';

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
    console.log('Data:', data);
    console.log('Errors:', errors);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('applicant.register'), {
            data: {
                ...data, 
                company_id: data.company_id,
            },
            onError: (err) => {
                if (err.message) {
                    setErrorMessage(err.message);
                }
            },
            onFinish: () => {
                reset('');
                setErrorMessage('');
            }
        });
    };

    return (
        <>
            <Head title="Register Applicant" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-green-500 font-bold mb-6 text-center mt-6 boobs">{company_name || 'Unknown Company'} Registration</h2>

                <form onSubmit={submitHandler} className="space-y-6 form-container">
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={data.name}
                            isFocused={true}
                            className="rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 input-field"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
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
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
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

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="password_confirmation"
                            value={data.password_confirmation}
                            className="rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 input-field"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
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
                            <Link href={`/applicant/login?company_id=${company_id}`} className="login-link">
                                Click to login!!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
