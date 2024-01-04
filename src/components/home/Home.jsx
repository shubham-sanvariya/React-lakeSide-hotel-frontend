import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../Common/Parallax';
import HotelServices from '../Common/HotelServices';

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <Parallax />
        <HotelServices />
        <Parallax />
      </section>
    </section>
  )
}

export default Home