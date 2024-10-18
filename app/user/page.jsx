"use client"
import React, { useState } from 'react';
import Section from '../components/HOC/Section';
import Input from '../components/Utils/Form/Input';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '@/redux/slices/userSlice';

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerForm, setRegisterForm] = useState({})

  const dispatch = useDispatch()

  const onRegisterHandler = (e) => {
    e.preventDefault()
    console.log("registerForm", registerForm);
    
    dispatch(RegisterUser(registerForm))
  }
  return (
    <Section>
        <div className='main pt-16 h-full w-fit flex flex-col justify-center items-center mx-auto'>
            {/* Breadcrumb */}
            <div className="flex space-x-4 mb-6">
                <button
                className={`text-lg ${isLogin ? 'font-bold text-blue-600' : 'text-gray-400'}`}
                onClick={() => setIsLogin(true)}
                >
                Login
                </button>
                <button
                className={`text-lg ${!isLogin ? 'font-bold text-blue-600' : 'text-gray-400'}`}
                onClick={() => setIsLogin(false)}
                >
                Register
                </button>
            </div>

            {/* Conditionally render Login or Register form */}
            {isLogin ? (
                <div className='form-container mx-auto'>
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form className='flex flex-col gap-7'>
                    <Input 
                    value={registerForm.email}
                    onChange={e => setRegisterForm({...registerForm, ['email']:e.target.value})}
                    type="email"
                    placeholder="Email"
                    />
                    <Input 
                    value={registerForm.password}
                    onChange={e => setRegisterForm({...registerForm, ['password']:e.target.value})}
                    type="password"
                    placeholder="Password"
                    />
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                    Login
                    </button>
                </form>
                </div>
            ) : (
                <div className='form-container mx-auto'>
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form className='flex flex-col gap-7'>
                    <Input
                    value={registerForm.userName}
                    onChange={e => setRegisterForm({...registerForm, ['userName']:e.target.value})}
                    type="text"
                    placeholder="Name"
                    />
                    <Input
                    value={registerForm.email}
                    onChange={e => setRegisterForm({...registerForm, ['email']:e.target.value})}
                    type="email"
                    placeholder="Email"
                    />
                    <Input
                    value={registerForm.password}
                    onChange={e => setRegisterForm({...registerForm, ['password']:e.target.value})}
                    type="password"
                    placeholder="Password"
                    />
                    <button
                    type="submit"
                    onClick={onRegisterHandler}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    >
                    Register
                    </button>
                </form>
                </div>
            )}
        </div>
    </Section>
  );
};

export default User;
