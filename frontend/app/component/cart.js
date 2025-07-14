import React from 'react'

function Cart({prop}) {
  return (
    <div>
        <h1>{prop.sub}</h1>
        <p>{prop.des}</p>
    </div>
  )
}

export default Cart