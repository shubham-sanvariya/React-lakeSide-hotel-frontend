import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../Common/Parallax';
import HotelServices from '../Common/HotelServices';
import RoomCarousel from '../Common/RoomCarousel';

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelServices />
        <Parallax />
        <RoomCarousel />
      </section>
    </section>
  )
}

export default Home