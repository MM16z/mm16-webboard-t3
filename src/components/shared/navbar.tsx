'use client'
import React, { useState } from 'react';

import Link from "next/link"

import { Button } from "~/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "~/components/theme-toggle"

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex justify-between items-center h-14 mx-auto w-full">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold">MM16 Webboard</span>
                </Link>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    {isLoggedIn ? (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <Button variant="ghost" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={handleLogin}>Login</Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
