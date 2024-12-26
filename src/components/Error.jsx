import React from 'react'
import errorimage from "../assets/404.png"

export function Error() {
  return (
    <div className='error' >
      <img src={errorimage} alt="Page not Found" />
    </div>
  )
}

