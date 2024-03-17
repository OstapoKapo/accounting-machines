'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import '../globals.css';
import axios from 'axios';
import { useCookies } from "react-cookie"
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/userSlice';

export default function Sign() {

const dispatch = useDispatch();
const router = useRouter();
const [cookie, setCookie] = useCookies(["user"])
const [inputValues, setInputValues] = useState<any>({
  inputName: '',
  inputSurname: '',
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

const submitHandle = () => {
  if(inputValues.inputName.length >= 3){
    if(inputValues.inputSurname.length >= 3){
      if(validateEmail(inputValues.inputEmail)){
        if(inputValues.inputPassword.length >= 5){
          const user = {
            firstName: inputValues.inputName,
            secondName: inputValues.inputSurname,
            email:inputValues.inputEmail.toLowerCase(),
            password:inputValues.inputPassword.toLowerCase(),
            avatarImg: 'none',
            description: 'none',
            cars: []
          }
          postHandle(user);
          setInputValues({
            inputName: '',
            inputSurname: '',
            inputEmail: '',
            inputPassword: '',
        })
        }else{
          alert('Your password should be longer than 5 ');
        }
      }else{
        alert('Your email isnt correct');
      }
    }else{
      alert('Your second name should be longer than 3');
    }
  }else{
    alert('Your name should be longer than 3');
  }
}

const postHandle = async (user: User) => {
  const data = user;
  await axios.post('/api/signUp', {data})
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
        <h1 className='text-[40px] text-[#5DB75E] font-semibold mb-[30px]'>Sign In</h1>
        <input type="text" onChange={handleChange} name="inputName" value={inputValues.inputName} className='input my-[20px]' placeholder='First Name'/>
        <input type="text" onChange={handleChange} name="inputSurname" value={inputValues.inputSurname} className='input my-[20px]' placeholder='Second Name'/>
        <input type="text" onChange={handleChange} name="inputEmail" value={inputValues.inputEmail} className='input my-[20px]' placeholder='E-mail'/>
        <input type="password" onChange={handleChange} name="inputPassword" value={inputValues.inputPassword} className='input my-[20px]' placeholder='Password'/>
        <div className='w-[190px] h-[50px] mt-[50px] center text-[20px] text-white bg-[#FFB400] rounded-[10px] cursor-pointer' onClick={submitHandle}>Submit</div>   
      </div>
  );
}