"use client"
import React, { useEffect, useState } from 'react';
import Section from '../components/HOC/Section';
import Input from '../components/Utils/Form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser, SignInUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { isValidEmail } from '../functions';

const User = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerForm, setRegisterForm] = useState({})
  const [loginForm, setLoginForm] = useState({
    email:'',
    password: ''
  })
  const [error, setError] = useState({})
  const [isClicked, setIsClicked] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  const response = useSelector((state) => state?.settings?.response)

  useEffect(() => {
    localStorage.clear()
  },[])

  useEffect(() => {
    if(response && Object.keys(response).length > 0){
        console.log(response.token !== undefined);
        setIsClicked(false)
        console.log("isLogin", isLogin, response.email !== undefined);
        
        if(response.email !== undefined){
            if(!isLogin){
                toogleForm(true)
                // setIsLogin(true)
                // setRegisterForm({})
            } else {
                window.location.reload()
                window.location.href = '/dashboard'
                // router.push('/dashboard')
            }
        }
    }
  },[response])

  const LoginChangeHandler = e => {
    const {name, value} = e.target
    setLoginForm({...loginForm, [name]:value.trim()})
    setError({...error, [name]: ''})
  }

  const RegisterChangeHandler = e => {
    const {name, value} = e.target
    setRegisterForm({...registerForm, [name]:value})
    setError({...error, [name]: ''})
  }
  
  const onRegisterHandler = (e) => {
    if (isClicked) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    const trimmedFormData = {
        ...registerForm,
        userName: registerForm?.userName?.trim()
    };
    if (!registerForm.email || !trimmedFormData.password || !trimmedFormData.userName || !isValidEmail(registerForm.email)) {
      let err = {};
      if (!registerForm.email) {
        err.email = "Email Required";
      } else if (!isValidEmail(registerForm.email)) {
        err.email = "Invalid Email";
      }
      if (!trimmedFormData.password) {
        err.password = "Password Required";
      }
      if (!trimmedFormData.userName) {
        err.userName = "Your name Required";
      }
      setError(err);
      return;
    } else {
      setIsClicked(true)
      dispatch(RegisterUser(trimmedFormData))
    }
  }

  const onLoginHandler = (e) => {
    if (isClicked) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    if (!loginForm.email || !loginForm.password || !isValidEmail(loginForm.email)) {
      let err = {};
      if (!loginForm.email) {
        err.email = "Email Required";
      } else if (!isValidEmail(loginForm.email)) {
        err.email = "Invalid Email";
      }
      if (!loginForm.password) {
        err.password = "Password Required";
      }
      setError(err);
      return;
    } else {
      setIsClicked(true)
      dispatch(SignInUser(loginForm))
    }
  }

  function toogleForm(val) {
    setIsLogin(val)
    setError({})
    setLoginForm({})
    setRegisterForm({})
    setIsClicked(false)
  }

  return (
    <Section>
        <div className='main pt-16 h-full w-fit flex flex-col justify-center items-center mx-auto'>
            {/* Breadcrumb */}
            <div className="flex space-x-4 mb-6">
                <button
                className={`text-lg ${isLogin ? 'font-bold text-blue-600' : 'text-gray-400'}`}
                onClick={() => toogleForm(true)}
                >
                Login
                </button>
                <button
                className={`text-lg ${!isLogin ? 'font-bold text-blue-600' : 'text-gray-400'}`}
                onClick={() => toogleForm(false)}
                >
                Register
                </button>
            </div>

            {/* Conditionally render Login or Register form */}
            {isLogin ? (
                <div className='form-container mx-auto'>
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form className='flex flex-col gap-7'>
                    <Input error={error.email} 
                    value={loginForm.email?.trim()}
                    name='email'
                    onChange={LoginChangeHandler}
                    type="email"
                    placeholder="Email"
                    />
                    <Input error={error.password} 
                    value={loginForm.password}
                    name='password'
                    onChange={LoginChangeHandler}
                    type="password"
                    placeholder="Password"
                    />
                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    onClick={onLoginHandler}
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
                    error={error.userName}
                    value={registerForm.userName}
                    name='userName'
                    onChange={RegisterChangeHandler}
                    type="text"
                    placeholder="Name"
                    />
                    <Input
                    error={error.email}
                    value={registerForm.email}
                    name='email'
                    onChange={RegisterChangeHandler}
                    type="email"
                    placeholder="Email"
                    />
                    <Input
                    error={error.password}
                    value={registerForm.password}
                    name='password'
                    onChange={RegisterChangeHandler}
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
