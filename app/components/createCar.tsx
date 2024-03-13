import '../globals.css';

export default function Header() {

    function readImage(file: any, imgElement: HTMLImageElement) {
        // Check if the file is an image.
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
        }
    
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            imgElement.src = event.target.result;
        });
        reader.readAsDataURL(file);
    }
    
    const getImage = (e: any) => {
        let target = e.target;
        let img = document.getElementById('imageElement') as HTMLImageElement;
        readImage(target.files[0], img);
    }
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
        <div className='w-[370px] h-[306px]'>
            <div className='w-full h-full bg-[url(/drag-and-drop-icon.png)] bg-[cover]'>
                <input type="file" className='w-full h-full opacity-[0] cursor-pointer' onChange={getImage}  accept=".jpg, .jpeg, .png, .img"/>
            </div>
            <img src="" id='imageElement' className='w-[50px] h-[50px]' alt="" />
        </div>
        <div className='min-w-200px h-min flex flex-col'>
            <input type="text" className='input' placeholder='Model'/>
             <div className='row mt-[20px]'>
               <input type="text" className='input' placeholder='Mark'/>
               <input type="text" maxLength={4} className='input ml-[30px]' placeholder='Year'/>
             </div>
        </div>
    </div>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Lubricants:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <input type="date" maxLength={10} className='input ml-[30px]' placeholder='Date'/>
        </div>
        </div>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Filter:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <input type="date" maxLength={10} className='input ml-[30px]' placeholder='Date'/>
        </div>
        </div>
        <div className='w-[140px] h-[45px] mt-[30px] rounded-[6px] center border-[1px] text-white bg-[#5DB75E] cursor-pointer'>Create</div>
    </div>
   </div>
  );
}