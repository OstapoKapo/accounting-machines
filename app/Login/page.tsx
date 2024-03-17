'use client'
import axios from 'axios';
import '../globals.css';
import React, { useState } from 'react';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/userSlice';



export default function Login() {

  
const router = useRouter();
const dispatch = useDispatch();
const [cookie, setCookie] = useCookies(["user"])
const [inputValues, setInputValues] = useState<any>({
  inputEmail: '',
  inputPassword: '',
});

const handleChange = (e: any) => {
  const { name, value } = e.target;
  setInputValues((prevValues: any) => ({
    ...prevValues,
    [name]: value,
  }));
};

const handleSubmit = () => {
  if(validateEmail(inputValues.inputEmail)){
    if(inputValues.inputPassword.length >= 5){
      const user = {
        email:inputValues.inputEmail.toLowerCase(),
        password:inputValues.inputPassword.toLowerCase()
      }
      postHandle(user);
      setInputValues({
        inputEmail: '',
        inputPassword: '',
      })
    }else{
      alert('Your password should be longer than 5');
    }
  }else{
    alert('Your email isnt correct');
  }
}

const postHandle = async (user: any) => {
  const data = user;
  await axios.post('/api/login', {data})
  .then((response) => {
    if(response.status === 200){
      if(typeof response.data === 'string' ){
        alert(response.data);
      }else if(typeof response.data === 'object'){
        dispatch(setUser(response.data));
        const cookieUser = {
          email: response.data.email,
          password: response.data.password
        }
        setCookie("user", JSON.stringify(cookieUser), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        router.push('/Main');
      }
    }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


return (
  <div className='w-[100%] h-full center flex-col bg-[url(../public/background.png)] bg-center bg-cover p-[20px]'>
    <h1 className='text-[40px] text-[#5DB75E] font-semibold'>Log In</h1>
    <input type="text" className='input my-[50px]' placeholder='E-mail' onChange={handleChange} value={inputValues.inputEmail} name='inputEmail'/>
    <input type="password" className='input' placeholder='Password' onChange={handleChange} value={inputValues.inputPassword} name='inputPassword'/>
    <div className='w-[190px] h-[50px] mt-[50px] center text-[20px] text-white bg-[#FFB400] rounded-[10px] cursor-pointer' onClick={handleSubmit}>Submit</div>
  </div>
);
}