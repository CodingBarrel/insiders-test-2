"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {Room} from "@src/types/room";
import InputField from "@src/components/form/InputField";
import {roomApi} from "@src/api/room-api";

interface Props {
    mode: "create" | "update";
    initialData?: Partial<Room>;
}

export default function RoomModal({mode, initialData}: Props) {
    const router = useRouter();

    const [id, setId] = useState<number>(initialData?.id || 0);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<Partial<Room>>({
        name: initialData?.name || "",
        description: initialData?.description || "",
    });

    const handleChange = (
        key: keyof Room,
        value: string | number | boolean
    ) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (mode === "create") {
                await roomApi.create(form);
            } else if (initialData?.id) {
                await roomApi.update(initialData.id, form);
            }
            router.push("/rooms");
        } catch (err) {
            console.error(err);
            setError("Помилка при збереженні");
        }
    };

    return (
        <div>
            {mode === "create" ? (<h2 className="text-2xl font-semibold text-center">Створення нової кімнати</h2>) :
                (<h2 className="text-2xl font-semibold text-center">Редагування кімнати {id}</h2>)
            }
            <form onSubmit={handleSubmit}>
                <InputField label={"Назва"} value={form.name ?? ""} onChange={(val) => handleChange("name", val)}
                            required/>
                <InputField label={"Опис"} type={"textarea"} value={form.description ?? ""}
                            onChange={(val) => handleChange("description", val)}/>
            </form>
        </div>
    )
}