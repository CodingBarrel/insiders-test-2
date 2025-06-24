"use client"

import Link from 'next/link'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState<string | null>(null)

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token')
            const userJson = localStorage.getItem('user')
            console.log('userJson ', userJson);
            console.log('token ', token);
            if (token && userJson) {
                const user = JSON.parse(userJson)
                setIsAuthenticated(true);
                setUserName(user.name);
            }
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUserName(null);
        router.push('/auth/login');
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-blue-600 cursor-pointer">
                            Bunker
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-500 transition">
                            Головна
                        </Link>
                        <Link href="/rooms" className="text-gray-700 hover:text-blue-500 transition">
                            Кімнати
                        </Link>
                        <Link href="/bookings" className="text-gray-700 hover:text-blue-500 transition">
                            Бронювання
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <p className="text-gray-700">{userName}</p>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-600 hover:text-red-800 transition"
                                >
                                    Вийти
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="text-gray-700 hover:text-blue-500 transition">
                                Авторизація
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
