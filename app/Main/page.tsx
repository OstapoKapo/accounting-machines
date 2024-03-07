import { Header } from '../components';
import '../globals.css';

export default function Home() {
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