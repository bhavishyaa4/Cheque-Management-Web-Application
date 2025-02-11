import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm, Link } from "@inertiajs/react";
import React, { useState } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import '../../../css/SuperAdmin/adminLogReg.css'

const AdminRegister = () => {
    const {data, setData, post, processing, errors, reset} = useForm({
       name: '',
       email: '',
       username: '',
       role: '',
       password: '',
       password_confirmation: '', 
    });

    const [errorMessage, setErrorMessage] = useState('');
    console.log('Data:',data);
    console.log('Errors:',errors);

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.store'),{
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
            <Head title="Admin Register" />
            <div className="container mx-auto animate-fadeIn">
                <h2 className="text-3xl text-orange-500 font-bold mb-6 text-center mt-6">Admin Register</h2>
                <form onSubmit={submitHandler}  className="space-y-6 form-container">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={data.name}
                            isFocused={true}
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
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
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} />                        
                    </div>
                    <div>
                        <InputLabel htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            autoComplete="username"
                            value={data.username}
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
                            onChange={(e) => setData('username', e.target.value)}
                        />
                        <InputError message={errors.username} />                        
                    </div>
                    <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <TextInput
                            id="role"
                            type="text"
                            name="role"
                            autoComplete="role"
                            value={data.role}
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
                            onChange={(e) => setData('role', e.target.value)}
                        />
                        <InputError message={errors.role} />                        
                    </div>
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
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
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="password_confirmation"
                            value={data.password_confirmation}
                            className="rounded-md border-orange-500 shadow-sm focus:border-orange-600 focus:ring-orange-600 input-field"
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
                            {processing ? 'Registering...' : 'Register'}
                        </PrimaryButton>
                    </div>
                    <div className="text-center mt-4">
                        <p className="info-text">
                            Already have an account?{' '}
                            <Link href="/superadmin/login" className="login-link">
                                Click to login!!
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AdminRegister;