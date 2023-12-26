import React, { useEffect, useState } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes] = useState([""]);
    const[showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, []);

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypesInput(false);
        }
    }

    return (
        <>
            
        </>
    );
}

export default RoomTypeSelector;
