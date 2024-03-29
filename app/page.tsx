'use client'
import { useEffect } from 'react';
import { Logo } from './components';
import './globals.css';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  useEffect(()=>{
    const handlePost = async () => {
      await axios.post('/api/cookie', {})
      .then((response) => {
      if(response.status === 200){
        if(response.data === 'none'){

        }else{
          router.push('/Main');
        }
      }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      }
      handlePost();
  },[])

  return (
      <div className='w-[100%] h-full flex items-center justify-between bg-[url(../public/background.png)] bg-center bg-cover p-[20px]'>
        <div className='w-min h-min flex content-center flex-col pl-[100px]'>
          <Logo />
          <div className='row center mt-[100px] '>
          <Link href={`/Login`} className="goods__link">
            <div className='w-[190px] h-[50px] mr-[50px] center text-[20px] text-white bg-[#5DB75E] rounded-[10px] cursor-pointer'>Log In</div>
          </Link>
          <Link href={`/Sign`} className="goods__link">
            <div className='w-[190px] h-[50px] center text-[20px] text-white bg-[#FFB400] rounded-[10px] cursor-pointer'>Sign In</div>
          </Link>
          </div>
        </div>
        <div className='w-[50%] h-full center'>
          <img className='w-[520px] h-[520px]' src="/homePage.png" alt="image" />
        </div>
      </div>
  );
}
