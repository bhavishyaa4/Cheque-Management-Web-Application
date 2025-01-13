import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import '../../../css/companyLogReg.css';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    console.log('Data:', data);
    console.log('Errors:', errors);

    const submitHandler = (e) => {
        e.preventDefault();
        
        post(route('login'), {
            onError: (err) => {
                if(err.message){
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
            <Head title="Login to Company" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl font-bold mb-6 text-center mt-6">Company Login</h2>

                <form onSubmit={submitHandler} className="space-y-6 form-container">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            isFocused={true}
                            autoComplete="email"
                            value={data.email}
                            className="input-field"
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
                            className="input-field"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} />
                    </div>
                    {
                                errorMessage && (
                                    <p className="text-blue-500 text-center text-sm">{errorMessage}</p>
                                )
                            }
                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Logging in...' : 'Login'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}