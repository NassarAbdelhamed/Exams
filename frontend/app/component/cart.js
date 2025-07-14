import React from 'react'
import './cart.css'

function Cart({ prop }) {
  return (
    <div className="cart"> 
      <h1 className="cart__heading">{prop.sub}</h1>
      <p className="cart__description">{prop.des}</p>
    </div>
  )
}

export default Cart