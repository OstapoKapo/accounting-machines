'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import '../globals.css';
import axios from 'axios';
import { User } from '@/types';

export default function Home() {

const router = useRouter();
  
const postHandle = async (user: User) => {
  const data = user;
  await axios.post('/api/user', {data})
  .then((response) => {
    if(response.status === 200){
      if(typeof response.data === 'string' ){
        alert(response.data);
      }else if(typeof response.data === 'object'){
        console.log(response.data);
        router.push('/Main');
      }
    }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


  const [inputValues, setInputValues] = useState<any>({
    sign__inputName: '',
    sign__inputSurname: '',
    sign__inputEmail: '',
    sign__inputPassword: '',
});

const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
};

const submitHandle = () => {
  if(inputValues.sign__inputName.length >= 3){
    if(inputValues.sign__inputSurname.length >= 3){
      if(validateEmail(inputValues.sign__inputEmail)){
        if(inputValues.sign__inputPassword.length > 5){
          const user = {
            firstName: inputValues.sign__inputName,
            secondName: inputValues.sign__inputSurname,
            email:inputValues.sign__inputEmail.toLowerCase(),
            password:inputValues.sign__inputPassword.toLowerCase(),
            avatarImg: 'none',
            description: 'none',
            cars: []
          }
          postHandle(user);
          setInputValues({
            sign__inputName: '',
            sign__inputSurname: '',
            sign__inputEmail: '',
            sign__inputPassword: '',
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

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

  return (
      <div className='w-[100%] h-full center flex-col bg-[url(../public/background.png)] bg-center bg-cover p-[20px]'>
        <h1 className='text-[40px] text-[#5DB75E] font-semibold mb-[30px]'>Sign In</h1>
        <input type="text" onChange={handleChange} name="sign__inputName" value={inputValues.sign__inputName} className='input my-[20px]' placeholder='First Name'/>
        <input type="text" onChange={handleChange} name="sign__inputSurname" value={inputValues.sign__inputSurname} className='input my-[20px]' placeholder='Second Name'/>
        <input type="text" onChange={handleChange} name="sign__inputEmail" value={inputValues.sign__inputEmail} className='input my-[20px]' placeholder='E-mail'/>
        <input type="password" onChange={handleChange} name="sign__inputPassword" value={inputValues.sign__inputPassword} className='input my-[20px]' placeholder='Password'/>
        <div className='w-[190px] h-[50px] mt-[50px] center text-[20px] text-white bg-[#FFB400] rounded-[10px] cursor-pointer' onClick={submitHandle}>Submit</div>   
      </div>
  );
}