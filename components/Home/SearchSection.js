'use client'
import React, { useContext, useEffect, useState } from 'react'
import { SourceContext } from '/context/SourceContext';
import { DestinationContext } from '/context/DestinationContext';
import InputItem from './InputItem'
import CarListOptions from './CarListOptions';

function SearchSection() {
    const {source,setSource}=useContext(SourceContext);
    const {destination,setDestination}=useContext(DestinationContext);
    const [distancia,setDistancia]=useState();

    const calculateDistance=()=>{
      const dist=google.maps.geometry.spherical.computeDistanceBetween(
        {lat:source.lat,lng:source.lng},
        {lat:destination.lat,lng:destination.lng}
      )
      // console.log(dist)
      setDistancia(dist*0.001)
    }


    

  return (
    <div>

      <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
        <p className='text-[20px]'>A donde vamos:</p>
        <InputItem type="source"/>
        <InputItem type="destination"/>

        <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'
          onClick={()=>calculateDistance()}
        >Buscar</button>
      </div>
      {distancia?<CarListOptions distancia={distancia}/>:null}
    </div>
  )
}

export default SearchSection
