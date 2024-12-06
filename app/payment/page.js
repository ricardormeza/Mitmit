'use client'
import CheckoutForm from '/components/Home/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation'
import React from 'react'

function Payment() {
  const searchParams=useSearchParams();
  const amount=searchParams.get('amount')
  // console.log(amount)

  const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY)
  const options={
    mode:'payment',
    amount:Math.round(amount*100),
    currency:'mxn'
  }
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount}/>
      </Elements>
      
    </div>
  )
}

export default Payment
