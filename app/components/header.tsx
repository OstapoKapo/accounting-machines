'use client'
import { Logo } from '.';
import '../globals.css';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie"

export default function Header() {

    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"])

    const handleExit = () => {
        setCookie("user", JSON.stringify({}), {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          })
        router.push('/');
    }

  return (
    <header className='w-full h-min flex items-center'>
        <div className='w-[50%] h-full flex items-center'>
            <Logo />
        </div>
        <div className='w-[50%] h-full flex items-center justify-end'>
            <div className='min-w-[150px] h-full flex items-center'>
                <div className='w-[80px] h-[80px] center text-[#fff] text-[20px] font-semibold rounded-full bg-[#999] '>PO</div>
                <div className='w-[120px] h-[40px] mx-[10px] rounded-[6px] center border-[1px] border-[#999] cursor-pointer'>
                    <img className='w-[20px] h-[20px] mr-[5px]' src="/user.png" alt="User" />
                    Profile
                </div>
                <div className='w-[120px] h-[40px] mx-[10px] rounded-[6px] center border-[1px] text-white bg-[#5DB75E] cursor-pointer' onClick={handleExit}>Log Out</div>
            </div>
        </div>
    </header>
  );
}