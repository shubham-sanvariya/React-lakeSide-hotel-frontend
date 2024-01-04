import React from 'react'

const Header = ({title}) => {
  return (
    <div className='header'>
        <div className='overlay'></div>
        <div className='container'></div>

        <h1 className='header-title text-center'>{title}</h1>
    </div>
  )
}

export default Header