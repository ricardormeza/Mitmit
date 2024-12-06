import React from 'react'
import Image from 'next/image'
import { HiUserCircle } from "react-icons/hi";

function CarListItems({car,distancia}) {
  return (
    <div>
        <div className='flex p-1 items-center justify-between'>
            <div className='flex m-2 items-center gap-5'>
            <Image src={car.image}
                width={100} height={100} alt='imagen de auto'
            />
                <div>
                    <h3 className='font-bold flex gap-3'>
                        {car.name}
                        <span className='flex gap-3 text-xl items-center md:text-sm'><HiUserCircle />{car.seat}</span>
                    </h3>
                    <p> {car.desc} </p>
                </div>
            </div>
                <h2 className='lg:text-xl  font-semibold md:text-[10px]'>${car.price.toFixed(2)}</h2>
        </div>
    </div>
  )
}

export default CarListItems
