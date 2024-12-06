import { CarListData } from '/utils/CarListData'
import React, { useState } from 'react'
import CarListItems from './CarListItems'
import { useRouter } from 'next/navigation';


function CarListOptions({distancia}) {
  const [activeIndex,setActiveIndex]=useState();
  const [selectedCar,setSelectedCar]=useState([]);
  const router=useRouter();
  return (
    <div className='mt-5'>
      <h2 className='text-xl'>Unidad disponible</h2>
      {CarListData.map((item,index)=>(
        <div className={`cursor-pointer p-2 rounded-md border-black
          ${activeIndex==index?'border-[2px]':null}`}
          onClick={()=>{setActiveIndex(index);
            setSelectedCar(item)
          }}
        >
          <CarListItems car={item} distancia={distancia}/>
        </div>
      ))}

      
      {selectedCar?.name?<div className='flex justify-between rounded-md   bg-white
       p-3 shadow-lg w-full  items-center bottom-3'>
        <h2 className='text-xl md:text-sm'>Solicitar unidad</h2>
        <button className='p-3 bg-blue-300 text-black text-xl 
        rounded-md text-center md:text-sm'
        onClick={()=>router.push('/payment?amount='+(selectedCar.price.toFixed(2)))}
        > Pagar Mitmit Car {selectedCar.name} </button>
      </div>:null}
    </div>
  )
}

export default CarListOptions
