import { Car } from '@/types';
import '../globals.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectValue } from '@/slices/userSlice';

export default function Cars({data, n, page, getNextData}: Car | any) {

    const dispatch = useDispatch();
    let user = useSelector(selectValue);

    const handleUpdateData = async (e: any) => {
        const target = e.target;
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1; // months from 1-12
        const day     = dateObj.getUTCDate();
        const year    = dateObj.getUTCFullYear();
        const newDate = `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`;
        const _id = target.getAttribute('id');
        let nextDate = '';
        
        if(target.getAttribute('data-action') === 'filter'){
            nextDate = getNextData(newDate, 20);
            await axios.post('/api/filter', {newDate, nextDate, _id, user})
            .then((response) => {
              if(response.status === 200){
                if(typeof response.data === 'string' ){
                  alert(response.data);
                }else if(typeof response.data === 'object'){
                    dispatch(setUser(response.data));
                }
              }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }else if(target.getAttribute('data-action') === 'lubricants'){
            nextDate = getNextData(newDate, 20);
            await axios.post('/api/lubricants', {newDate, nextDate, _id, user})
            .then((response) => {
              if(response.status === 200){
                if(typeof response.data === 'string' ){
                  alert(response.data);
                }else if(typeof response.data === 'object'){
                    dispatch(setUser(response.data));
                }
              }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

  return (
   <div className='w-full h-[60vh] rounded-[10px] flex-col border-[1px] border-[#999] mt-[30px] p-[20px]' style={{display: n === page ? 'flex' : 'none'}}>
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
            <img className='w-full h-full ' src={data.carImg} alt="Car" />
        </div>
        <div className='min-w-200px h-min flex flex-col'>
             <div className='text-[#999] text-[35px] font-semibold'>Model: <span className='text-[#5DB75E]'>{data.model}</span></div>
             <div className='row mt-[10px]'>
                <div className='text-[#999] text-[35px] font-semibold'>Mark: <span className='text-[#5DB75E]'>{data.brand}</span></div>
                <div className='text-[#999] text-[35px] font-semibold ml-[30px]'>Year: <span className='text-[#5DB75E]'>{data.year}</span></div>
             </div>
        </div>
    </div>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Lubricants:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <span className='text-[#FFB400] ml-[7px]'>{data.lubricants.lastChange}</span>
            <div className='h-[50px] w-[102px] bg-[#5DB75E] rounded-[8px] center text-[#fff] text-[23px] ml-[20px] cursor-pointer' data-action="lubricants"  id={data._id} onClick={handleUpdateData}>Update</div>
        </div>
        <div className='text-[#999] text-[30px] font-semibold'>Next: <span className='text-[#5DB75E]'>{data.lubricants.nextChange}</span></div>
        </div>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Filter:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <span className='text-[#FFB400] ml-[7px]'>{data.filter.lastChange}</span>
            <div className='h-[50px] w-[102px] bg-[#5DB75E] rounded-[8px] center text-[#fff] text-[23px] ml-[20px] cursor-pointer' data-action='filter' id={data._id} onClick={handleUpdateData}>Update</div>
        </div>
        <div className='text-[#999] text-[30px] font-semibold'>Next: <span className='text-[#5DB75E]'>{data.filter.nextChange}</span></div>
        </div>
    </div>
   </div>
  );
}