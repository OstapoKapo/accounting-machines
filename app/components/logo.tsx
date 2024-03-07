import '../globals.css';

export default function Logo() {
  return (
    <div className='flex items-center w-min h-min'>
        <img className='w-[84ps] h-[84px] mr-[10px]' src="/logo.png" alt="Logo" />
        <p className='text-[#5DB75E] font-semibold text-[40px]'>ProdanService</p>
    </div>
  );
}