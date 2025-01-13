import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import '../../../css/companyLogReg.css'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        address: '',
        phone: '', 
    });

    const [errorMessage, setErrorMessage] = useState('');
    console.log('Data:', data);
    console.log('Errors:', errors);


    const submitHandler = (e) => {
        e.preventDefault();  
        post(route('company.create'), {
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
            <Head title="Register Company" />

            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl font-bold mb-6 text-center mt-6">Register Company</h2>

                <form onSubmit={submitHandler} className="space-y-6 form-container">
                    <div>
                        <InputLabel htmlFor="name" value="Company Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={data.name}
                            isFocused={true}
                            className="input-field"
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
                            className="input-field"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            name="address"
                            type="text"
                            autoComplete="address"
                            value={data.address}
                            className="input-field"
                            onChange={(e) => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} />
                    </div>
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />
                        <TextInput
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="phone"
                            value={data.phone}
                            className="input-field"
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
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
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            autoComplete="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="input-field"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    {
                                errorMessage && (
                                    <p className="text-blue-500 text-center text-sm">{errorMessage}</p>
                                )
                            }
                    <div className="text-center">
                        <PrimaryButton className="submit-button" disabled={processing}>
                            {processing ? 'Processing...' : 'Register'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
