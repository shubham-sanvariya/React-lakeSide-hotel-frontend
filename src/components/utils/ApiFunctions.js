import axios from "axios";


export const api = axios.create({
    baseURL : "http://localhost:9192"
})

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return{
        Authorization : `Bearer ${token}`,
        "content-Type" : "application/json"
    }
}

// This function add a new room to the database
export async function addRoom(newRoom) {
    const formData = new FormData();
    if (newRoom.photo) {
        formData.append("photo", newRoom.photo);
    }

    formData.append("roomType", newRoom.roomType);
    formData.append("roomPrice", newRoom.roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData, {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            return true; // Indicates success
        } else {
            return false; // Indicates failure
        }
    } catch (error) {
        console.error("Error uploading room:", error);
        throw new Error("Failed to add room");
    }
}


// This function gets all room types from the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        const data = response.data; // Extract data from the response
        return data;
    } catch (error) {
        console.error("Error fetching room types:", error);
        throw new Error("Error fetching room types");
    }
}

// This function gets all rooms from the database
export async function getAllRooms(){
    try {
        const response = await api.get("/rooms/all-rooms");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// This function deletes a room by the Id
export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error('Error deleting room');
    }
}

// This function update a room
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: getHeader()
    });
    return response;
}

// This function gets a room by the Id
export async function getRoomById(roomId){
    try {
        const result = api.get(`/rooms/room/${roomId}`);
        return (await result).data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

// this function saves new booking to the database
export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        console.log(error)
        if(error.response && error.response.data){
            throw error;
        }else{
            throw new Error(`Error booking room : ${error.message}`);
        }
    }
}

// this function gets all bookings from the database
export async function getAllBookings(){
    try {
        const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		});
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`);
    }
}

// this function get booking by the confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.
        get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw error;
        }else{
            throw new Error(`Error find booking : ${error.message}`);
        }
    }
}

// this function cancel booking
export async function cancelBooking(bookingId){
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data;
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`);
    }
}

// this function gets all available rooms from the database within
// given date and a room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

export async function registerUser(registeration){
    try {
        const response = await api.post("/auth/register-user", registeration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.message) {
            throw new Error(error.response.data);
        }else{
            throw new Error(`User registration error : ${error.message}`);
        }
    }
}

export async function loginUser(login){
    try {
        const response = await api.post("/auth/login", login);
        if (response.status >= 200 & response.status < 300) {
            return response.data;
        }else{
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserProfile(userId, token){
    try {
        const response = await api.get(`users/profile/${userId}`,{
            headers : getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(userId){
    try {
        const response = await api.delete(`/users/delete/${userId}`,{
            headers : getHeader()
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export async function getUser(userId, token){
    try {
        const response = await api.get(`/users/${userId}`,{
            headers : getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}