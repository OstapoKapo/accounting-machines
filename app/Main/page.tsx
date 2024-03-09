'use client'
import { Header } from '../components';
import '../globals.css';
import axios from 'axios';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { setUser, selectValue } from '@/slices/userSlice';
import type { RootState } from '../Store/store';
import { useEffect } from 'react';
import { parse } from 'cookie';

export default function Main() {

  const dispatch = useDispatch();
  let user = useSelector(selectValue);

  useEffect(()=>{
    const handleGetCookie = async () => {
    await axios.get('/api/cookie', {})
    .then((response) => {
    if(response.status === 200){
      const data = JSON.parse(response.data.value);
      dispatch(setUser(data));
    }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }
    handleGetCookie();
    console.log(user);
  },[])

  return (
      <div className='w-[100%] h-full flex items-center flex-col bg-[url(../public/background.png)] bg-center bg-cover py-[20px] px-[40px]'>
       <Header />
       <div className='w-full h-[6px] bg-[#5DB75E] rounded-[10px] mt-[30px]'></div>
       <div className='row justify-between mt-[30px]'>
        <div className='w-[140px] h-[45px] rounded-[6px] center border-[1px] text-white bg-[#5DB75E] cursor-pointer'>Add Car</div>
        <input type="text" className='input' placeholder='Search Car'/>
       </div>
      </div>
  );
}