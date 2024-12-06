import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api'
import { SourceContext } from '/context/SourceContext';
import { DestinationContext } from '/context/DestinationContext';

const containerStyle = {
  width: '100%',
  height: '400px',
}

function GoogleMapSection() {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   libraries: ['places'],
  // })

  const {source,setSource}=useContext(SourceContext);
  const {destination,setDestination}=useContext(DestinationContext);

  const [center,setCenter]=useState({
    lat: 32.5027,
    lng: -117.00371,
  })

  const [map, setMap] = React.useState(null);
  const [directionRoutePoints,setDirectionRoutePoints]=useState([]);

  useEffect(()=>{
    if(source?.length!=[]&&map){
      map.panTo(
        {
          lat: source.lat,
          lng: source.lng,
        }
      )
      setCenter({
        lat:source.lat,
        lng:source.lng,
      })
    }
    if(source.length!=[]&&destination.length!=[])
      {
        directionRoute();
      }
  },[source])

  useEffect(()=>{
    if(destination?.length!=[]&&map){
      setCenter({
        lat:destination.lat,
        lng:destination.lng,
      })
    }
    if(source.length!=[]&&destination.length!=[])
    {
      directionRoute();
    }
  },[destination])

  const directionRoute=()=>{
    const DirectionsService=new google.maps.DirectionsService();

    DirectionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING,
    },(result,status)=>{
      if(status===google.maps.DirectionsStatus.OK)
      {
        setDirectionRoutePoints(result);
      }else{
        console.error('Errorr papi');
      }
    })
  }

  const onLoad = React.useCallback((map) => {
    if (typeof window !== 'undefined' && window.google) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId:'e35d0a4a63cb669d'}}
    >
      {source.length!=[]? <MarkerF
      position={{lat:source.lat,lng:source.lng}}
      icon={{
        url:"/pin.jpg",
        scaledSize:{
          width:20,
          height:20
        }
      }}
      >
        <OverlayViewF
        position={{lat:source.lat,lng:source.lng}}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='P-2 bg-white font-bold inline-block'>
            <p className='text-black text-[16px]'>{source.label}</p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}

      {destination.length!=[]? <MarkerF
      position={{lat:destination.lat,lng:destination.lng}}
      icon={{
        url:"/destino.jpg",
        scaledSize:{
          width:20,
          height:20
        }
      }}
      >
        <OverlayViewF
        position={{lat:destination.lat,lng:destination.lng}}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='P-2 bg-white font-bold inline-block'>
            <p className='text-black text-[16px]'>{destination.label}</p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}
      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          suppressMarkers:true
        }}
      />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  )
}

export default GoogleMapSection
