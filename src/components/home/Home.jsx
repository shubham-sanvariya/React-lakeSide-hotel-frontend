import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../Common/Parallax';
import HotelServices from '../Common/HotelServices';
import RoomCarousel from '../Common/RoomCarousel';
import RoomSearch from '../Common/RoomSearch';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");
  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'>
         You are logged-In as {currentUser}
      </h6>}
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