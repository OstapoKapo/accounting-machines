'use client'
import { useState, useEffect } from 'react';
import '../globals.css';
import { Car } from '@/types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, selectValue } from '@/slices/userSlice';
import { setCarPage, allCarPageValue} from '@/slices/mainPageSlice';

export default function CreateCar({getNextData, handleChangeCar}: any) {

    let dispatch = useDispatch();
    let allCarPage = useSelector(allCarPageValue);
    let user = useSelector(selectValue); 
    const [carState, setCarState] = useState(false)
    const [inputValues, setInputValues] = useState<any>({
        inputModel: '',
        inputMark: '',
        inputYear: '',
        inputImg: '',
        inputLubricant: '',
        inputFilter: ''
      });
        
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputValues((prevValues: any) => ({
          ...prevValues,
          [name]: value,
        }));
      };

    function readImage(file: any, imgElement: HTMLImageElement) {
        // Check if the file is an image.
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            imgElement.src = event.target.result;
            setInputValues({
                inputModel: inputValues.inputModel,
                inputMark: inputValues.inputMark,
                inputYear:  inputValues.inputYear,
                inputImg: event.target.result,
                inputLubricant:  inputValues.inputLubricant,
                inputFilter:  inputValues.inputFilter
            })
        });
        reader.readAsDataURL(file);
    }
    
    const getImage = (e: any) => {
        let target = e.target;
        let img = document.getElementById('imageElement') as HTMLImageElement;
        readImage(target.files[0], img);
    }

    const handleCreate = () => {
        if(inputValues.inputModel.length >= 3){
            if(inputValues.inputMark.length >= 3){
                if(inputValues.inputYear.length === 4 && inputValues.inputYear <= new Date().getFullYear()){
                    if(inputValues.inputLubricant.length > 0){
                        if(inputValues.inputFilter.length > 0){
                            if(inputValues.inputImg.length > 0){
                                
                                const nextLubricant = getNextData(inputValues.inputLubricant, 40);
                                const nextFilter = getNextData(inputValues.inputFilter, 20);
                            
                                const dateObj = new Date();
                                const month   = dateObj.getUTCMonth() + 1; // months from 1-12
                                const day     = dateObj.getUTCDate();
                                const year    = dateObj.getUTCFullYear();
                                const newDate = `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`;
                                
                                let car: Car = {
                                  lubricants: {
                                    lastChange: inputValues.inputLubricant,
                                    nextChange: nextLubricant,
                                  },
                                  filter: {
                                    lastChange: inputValues.inputFilter,
                                    nextChange: nextFilter
                                  },
                                  history: [{
                                    description: 'Create Car',
                                    date: newDate
                                  }],        
                                  year: parseInt(inputValues.inputYear),
                                  model: inputValues.inputModel,
                                  brand: inputValues.inputMark,
                                  carImg: inputValues.inputImg,
                                }
                                handleCreateServer(car);
                            }else{
                                alert('Please give img');
                            }
                        }else{
                            alert('Please pass filter info');
                        }
                    }else{
                        alert('Please pass lubricant info');
                    }
                }else{
                    alert('Isnt correct year');
                }
            }else{
            alert('Mark should be longer than 3 letters');
            }
        }else{
            alert('Model should be longer than 3 letters');
        }
    }

    useEffect(()=>{
      if(carState === true){
        handleChangeCar();
      }
    }, [carState])
  
  async  function handleCreateServer(car: Car) {
    const userEmail = user.email;
    const userPassword = user.password;
    await axios.post('/api/car', {car, userEmail, userPassword})
    .then((response) => {
      if(response.status === 200){
        if(typeof response.data === 'string' ){
          alert(response.data);
        }else if(typeof response.data === 'object'){
          dispatch(setUser(response.data));
          setCarState(true);
        }
      }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

 

  return (
   <div className='w-full h-[60vh] rounded-[10px] border-[1px] border-[#999] mt-[30px] p-[20px]'>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='w-[370px] h-[306px]'>
            <input type="file" className='w-full h-full opacity-[0] cursor-pointer' onChange={getImage}   accept=".jpg, .jpeg, .png, .img"/>
            <img src="/drag-and-drop-icon.png" id='imageElement' className='w-full h-full mt-[-300px]' alt="" />
        </div>
        <div className='min-w-200px h-min flex flex-col'>
            <input type="text" className='input' placeholder='Model' value={inputValues.inputModel} onChange={handleChange} name='inputModel'/>
             <div className='row mt-[20px]'>
               <input type="text" className='input' placeholder='Mark' value={inputValues.inputMark} onChange={handleChange} name='inputMark'/>
               <input type="number" maxLength={4} className='input ml-[30px]' value={inputValues.inputYear} onChange={handleChange} name='inputYear' placeholder='Year'/>
             </div>
        </div>
    </div>
    <div className='w-full h-min items-center flex justify-around'>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Lubricants:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <input type="date" maxLength={10} className='input ml-[30px]' value={inputValues.inputLubricant} onChange={handleChange} name='inputLubricant' placeholder='Date'/>
        </div>
        </div>
        <div className='mon-w-100px h-min flex flex-col'>
        <div className='text-[#5DB75E] text-[35px] font-semibold'>Filter:</div>
        <div className='text-[#999] text-[30px] font-semibold mt-[10px] flex'>
            Last:  
            <input type="date" maxLength={10} className='input ml-[30px]' value={inputValues.inputFilter} onChange={handleChange} name='inputFilter' placeholder='Date'/>
        </div>
        </div>
        <div className='w-[140px] h-[45px] mt-[30px] rounded-[6px] center border-[1px] text-white bg-[#5DB75E] cursor-pointer' onClick={handleCreate}>Create</div>
    </div>
   </div>
  );
}