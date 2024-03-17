'use client'
import { Cars, CreateCar, Header } from '../components';
import '../globals.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectValue } from '@/slices/userSlice';
import { setCarPage, allCarPageValue} from '@/slices/mainPageSlice';
import { useEffect, useState} from 'react';
import moment from 'moment'
import { Car, User } from '@/types';

export default function Main() {

  const dispatch = useDispatch();
  let user: User = useSelector(selectValue)
  let allCarPage = useSelector(allCarPageValue);
  const [page, setPage] = useState<number>(0);
  
  useEffect(()=>{
    const handleGetUser = async () => {
    await axios.get('/api/cookie', {})
    .then((response) => {
    if(response.status === 200){
      if(response.data === 'none'){

      }else{
        const data = response.data;
        dispatch(setUser(data));
      }
    }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }
    handleGetUser();
  },[]);

  useEffect(()=>{
    console.log(user);
  },[user])

  function getNextData (data: string, amount: number): any { 
    const nextChangeFilter = moment(data).add(amount, 'days').calendar();
    const mounth = nextChangeFilter.substring(0,2);
    const day = nextChangeFilter.substring(3,5);
    const year = nextChangeFilter.substring(6,10);
    const newDate = `${year}-${mounth}-${day}`
    return(newDate);
  }

  const handleChangeCar = () => {
    dispatch(setCarPage(!allCarPage));
  }

  const handlePagination = (e: any) => {
    const target = e.target;
    const action: any = target.getAttribute('data-action');
    if(action){
      if(action === 'left'){
        if(page>0){
          setPage(page-1);
        }else{
          setPage(user.cars.length - 1);
        }
      }else if(action === 'right'){
        if(page<user.cars.length-1){
          setPage(page+1);
        }else{
          setPage(0);
        }
      }else {
        setPage(parseInt(action));
      }
    }
  } 

  useEffect(()=>{
    console.log(page)
  }, [page])


  return (
      <div className='w-[100%] h-full flex items-center flex-col bg-[url(../public/background.png)] bg-center bg-cover py-[20px] px-[40px]'>
       <Header />
       <div className='w-full h-[6px] bg-[#5DB75E] rounded-[10px] mt-[30px]'></div>
       <div className='row justify-between mt-[30px]'>
        <div className='w-[140px] h-[45px] rounded-[6px] center border-[1px] text-white bg-[#5DB75E] cursor-pointer' onClick={handleChangeCar}>{allCarPage ? 'Add Car' : 'Cancel'}</div>
        <input type="text" className='input' placeholder='Search Car'/>
       </div>    
        {allCarPage ? (
        <>
        {user.cars.length > 0 ? user.cars.map((car: Car) => <Cars getNextData={getNextData} key={user.cars.indexOf(car)} n={user.cars.indexOf(car)} page={page} data={car}/>) : (
        <>
        <div className='w-full h-[60vh] center'>
          <p className='text-[30px] text-[#5DB75E]'>You dont have car</p>
        </div>
        </>
       )}
        <div className='row justify-center mt-[50px]' onClick={handlePagination}>
          <div className='w-[40px] h-[40px] rotate-[-180deg]'>
            <img src="/arrow.png" alt="" data-action='left'/>
          </div>
          {user.cars.length > 0 ? user.cars.map((car: Car) =>  <div key={user.cars.indexOf(car)} className='w-[40px] h-[40px] center rounded-[100%] bg-[#FFB400] text-[#fff] text-[20px] mx-[10px]' data-action={user.cars.indexOf(car)}>{user.cars.indexOf(car) + 1}</div>) : ( '')}
          <div className='w-[40px] h-[40px]'>
            <img className='w-full h-full' src="/arrow.png" alt="" data-action='right'/>
          </div>
        </div>
        </>
       ) : (
        <>
        <CreateCar getNextData={getNextData} handleChangeCar={handleChangeCar}/>
        </>
       )}
      </div>
  );
}