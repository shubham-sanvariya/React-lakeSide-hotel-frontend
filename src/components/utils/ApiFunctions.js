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