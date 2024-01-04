import axios from "axios";


export const api = axios.create({
    baseURL : "http://localhost:9192"
})

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
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
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

    const response = await api.put(`/rooms/update/${roomId}`,formData);
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

export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error booking room : ${error.message}`);
        }
    }
}

export async function getAllBookings(){
    try {
        const result = await api.get('/bookings/all-bookings');
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`);
    }
}

export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result = await api.
        get(`/bookings//confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }else{
            throw new Error(`Error find booking : ${error.message}`);
        }
    }
}