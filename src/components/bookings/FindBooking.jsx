import React, { useState } from 'react';
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions';
import moment from 'moment';

const FindBooking = () => {
    const[confirmationCode, setConfirmationCode] = useState("");
    const [errors, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const[isDeleted, setIsDeleted] = useState(false);
    const[bookingInfo, setBookingInfo] = useState({
        bookingId: "",
        room : {id: ""},
        bookingConfirmationCode : "",
        roomNumber : "",
        checkInDate : "",
        checkOutDate : "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    });

    const clearBookingInfo = {
        bookingId: "",
        room : {id: ""},
        bookingConfirmationCode : "",
        roomNumber : "",
        checkInDate : "",
        checkOutDate : "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            console.log(data)
            setBookingInfo(data);
            setError(null);
        } catch (error) {
            setBookingInfo(clearBookingInfo);
            if(error.response && error.response.status === 404){
                setError(error.response.data);
            }else{
                setError(error.response);
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }

    const handleBookingCancellation = async(bookingId) => {
        try {
            await cancelBooking(bookingId);
            setIsDeleted(true);
            setBookingInfo(clearBookingInfo);
            setConfirmationCode("");
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find booking
                        </button>
                    </div>
                </form>

                {isLoading ? (
                    <div>Finding your booking...</div>
                ) : errors ? (
                    <div className="text-danger">Error: {errors}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Room Number: {bookingInfo.room.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>find booking...</div>
                )}

                {isDeleted && (
                    <div
                     className='alert alert-success mt-3'
                     role='alert'
                     >
                        Booking has been cancelled successfully
                    </div>
                )}
            </div>
        </>
    )
}

export default FindBooking;
