import '../globals.css';

export default function Home() {
  return (
      <div className='w-[100%] h-full center flex-col bg-[url(../public/background.png)] bg-center bg-cover p-[20px]'>
        <h1 className='text-[40px] text-[#5DB75E] font-semibold'>Log In</h1>
        <input type="text" className='input my-[50px]' placeholder='E-mail'/>
        <input type="password" className='input' placeholder='Password'/>
        <div className='w-[190px] h-[50px] mt-[50px] center text-[20px] text-white bg-[#FFB400] rounded-[10px] cursor-pointer'>Submit</div>
      </div>
  );
}