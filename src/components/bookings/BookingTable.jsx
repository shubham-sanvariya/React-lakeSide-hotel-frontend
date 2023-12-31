import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import DateSlider from '../Common/DateSlider';

const BookingTable = ({bookingInfo, handleBookingCancellation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo);

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if (startDate && endDate) {
            filtered = bookingInfo.filter((booking) => {
                console.log(booking.checkInDate);
                const checkInDateString = `${booking.checkInDate[0]}-${String(booking.checkInDate[1])
                    .padStart(2, '0')}-${String(booking.checkInDate[2]).padStart(2, '0')}`;
                const bookingStartDate = parseISO(checkInDateString)
                console.log(bookingStartDate)
                const checkOutDateString = `${booking.checkOutDate[0]}-${String(booking.checkOutDate[1]).padStart(2, '0')}-${String(booking.checkOutDate[2]).padStart(2, '0')}`;
                const bookingEndDate = parseISO(checkOutDateString)
                return (
                    bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
                )
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingInfo);
    }, [bookingInfo]);

    return (
        <section className='p-4'>
            <DateSlider
             onDateChange={filterBookings}
             OnFilterChange={filterBookings}
            />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check-In Date</th>
                        <th>Check-Out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate[0]+'-'+booking.checkInDate[1]+'-'+booking.checkInDate[2]}</td>
                            <td>{booking.checkOutDate[0]+'-'+booking.checkOutDate[1]+'-'+booking.checkOutDate[2]}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleBookingCancellation(booking.id)}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filterBookings.length === 0 && <p>No booking find for selected dates</p>}
        </section>
    );
}

export default BookingTable;
