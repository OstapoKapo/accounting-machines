import '../globals.css';

export default function Header() {
  return (
   <div className='w-full h-[60vh] rounded-[10px] border-[1px] border-[#999] mt-[30px] p-[20px]'>
    <div className='row justify-end'>
        <div className='w-[60px] h-[60px] cursor-pointer'>
             <img  className='w-full h-full '  src="/history-book.png" alt="history" />
        </div>
        <div className='w-[60px] h-[60px] ml-[20px] cursor-pointer'>
            <img className='w-full h-full ' src="/writing.png" alt="history" />
        </div>
    </div>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='w-[550px] h-[286px]'>
            <img className='w-full h-full ' src="/car1.png" alt="Car" />
        </div>
        <div className='min-w-200px h-min flex flex-col'>
             <div className='text-[#999] text-[35px] font-semibold'>Model: <span className='text-[#5DB75E]'>FDSD 32131</span></div>
             <div className='row mt-[10px]'>
                <div className='text-[#999] text-[35px] font-semibold'>Mark: <span className='text-[#5DB75E]'>Toyota</span></div>
                <div className='text-[#999] text-[35px] font-semibold ml-[30px]'>Year: <span className='text-[#5DB75E]'>2024</span></div>
             </div>
        </div>
    </div>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Lubricants:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <span className='text-[#FFB400] ml-[7px]'>20.04.2024</span>
            <div className='h-[50px] w-[102px] bg-[#5DB75E] rounded-[8px] center text-[#fff] text-[23px] ml-[20px] cursor-pointer'>Update</div>
        </div>
        <div className='text-[#999] text-[30px] font-semibold'>Next: <span className='text-[#5DB75E]'>20.04.2024</span></div>
        </div>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Filter:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <span className='text-[#FFB400] ml-[7px]'>20.04.2024</span>
            <div className='h-[50px] w-[102px] bg-[#5DB75E] rounded-[8px] center text-[#fff] text-[23px] ml-[20px] cursor-pointer'>Update</div>
        </div>
        <div className='text-[#999] text-[30px] font-semibold'>Next: <span className='text-[#5DB75E]'>20.04.2024</span></div>
        </div>
    </div>
   </div>
  );
}