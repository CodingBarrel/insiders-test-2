"use client";

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {UserRegisterDto} from "@src/types/user/user-register.dto";
import InputField from "@src/components/form/InputField";
import {userApi} from "@src/api/user-api";

export const RegisterForm = () => {
    const router = useRouter();

    const [form, setForm] = useState<UserRegisterDto>({email: '', name: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        key: keyof UserRegisterDto,
        value: string | number | boolean
    ) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await userApi.register(form);
            router.push('/auth/login');
        } catch (err: any) {
            setError('Сталася помилка. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center">Реєстрація</h2>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <InputField label={"Електронна пошта"} type={"email"} value={form.email}
                        onChange={(val) => handleChange("email", val)}/>
            <InputField label={"Ім'я"} value={form.name} onChange={(val) => handleChange("name", val)}/>
            <InputField label={"Пароль"} value={form.password} type={"password"}
                        onChange={(val) => handleChange("password", val)}/>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
                {loading ? 'Спроба зареєструватись...' : 'Увійти'}
            </button>
        </form>
    );
};
