import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../Common/Parallax';
import HotelServices from '../Common/HotelServices';
import RoomCarousel from '../Common/RoomCarousel';
import RoomSearch from '../Common/RoomSearch';

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <RoomSearch/>
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