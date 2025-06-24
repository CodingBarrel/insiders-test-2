"use client"

import React, {useEffect, useState} from "react";
import {Room} from "@src/types/room";
import {roomApi} from "@src/api/room-api";
import RoomModal from "@src/components/RoomsModal";

export default function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([])
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);

    useEffect(() => {
        roomApi.getAll().then(setRooms);
    }, [])

    const handleCreate = async () => {
        console.log("Click");
        setShowCreateModal(true);
    }

    const handleUpdate = async (room: Room) => {
        setShowUpdateModal(true);
        setEditingRoom(room);
    }

    const handleDelete = async (id: number) => {
        try {
            await roomApi.delete(id);
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
        } catch (error : any) {
            setError("Помилка при видаленні");
        }
    }

    return (
        <>
            <h2 className="text-2xl font-semibold text-center">Кімнати</h2>
            <button
                onClick={() => handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Створити
            </button>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <table>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Опис</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td>{room.name}</td>
                        <td>{room.description}</td>
                        <button
                            className="text-blue-600 hover:underline"
                            onClick={() => handleUpdate(room)}
                        >
                            Змінити
                        </button>
                        <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(room.id)}
                        >
                            Видалити
                        </button>
                    </tr>
                ))}
                </tbody>
            </table>
            {showCreateModal && (
                <RoomModal mode={"create"}/>
            )}
            {showUpdateModal && (
                <RoomModal mode={"update"}/>
            )}
        </>
    )
}