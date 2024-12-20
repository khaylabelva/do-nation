'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { logOut } from '@/app/api/auth/auth.action'
import { toast } from 'sonner'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {
    const handleSignOut = async () => {
        try {
            await logOut(); // Ensure logout operation completes
            toast.success('Logged out successfully'); // Show toast after successful logout
        } catch (error) {
            toast.success('Logged out successfully'); 
        }
    };

    return (
        <Button onClick={handleSignOut} className='bg-red-500 font-semibold text-white text-xl px-6 py-2 rounded-xl hover:bg-red-600'>
            {children}
        </Button>
    );
}

export default SignOutButton;
